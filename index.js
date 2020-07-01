window.audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const OPTIONS = {
    LowVolume: 0x1,
    MediumVolume: 0x2,
    HighVolume: 0x4,

    LowPitch: 0x8,
    MediumPitch: 0x10,
    HighPitch: 0x20,

    ShortDuration: 0x40,
    MediumDuration: 0x80,
    LongDuration: 0x100,

    SquareWave: 0x200,
    SineWave: 0x400,
    TriangleWave: 0x800,

    Wait: 0x1000
};

const VOLUME_VALUES = [
    { option: OPTIONS.LowVolume, value: 0.5 },
    { option: OPTIONS.MediumVolume, value: 10 },
    { option: OPTIONS.HighVolume, value: 20 }
];

const PITCH_VALUES = [
    { option: OPTIONS.LowPitch, value: 110 },
    { option: OPTIONS.MediumPitch, value: 220 },
    { option: OPTIONS.HighPitch, value: 880 }
];

const DURATION_VALUES = [
    { option: OPTIONS.ShortDuration, value: 50 },
    { option: OPTIONS.MediumDuration, value: 500 },
    { option: OPTIONS.LongDuration, value: 1000 }
];

const WAVE_VALUES = [
    { option: OPTIONS.SquareWave, value: 'square' },
    { option: OPTIONS.SineWave, value: 'sine' },
    { option: OPTIONS.TriangleWave, value: 'triangle' }
];

const WAIT_VALUES = [
    { option: OPTIONS.Wait, value: true }
];

const getProp = (props, optionValues, defaultValue) => {
    for (let i = 0; i < optionValues.length; i++) {
        const { option, value } = optionValues[i];
        if ((props & option) === option) {
            return value;
        }
    }
    return defaultValue;
};

const beep = (vol, freq, duration, wave) => {
    const oscillator = window.audioContext.createOscillator();
    oscillator.frequency.value = freq;
    oscillator.type = wave;
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration * 0.001);
    const gain = window.audioContext.createGain();
    gain.gain.value = vol * 0.01;
    gain.connect(window.audioContext.destination);
    oscillator.connect(gain);
};

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const Beep = async (props) => {
    const vol = getProp(props, VOLUME_VALUES, 1);
    const pitch = getProp(props, PITCH_VALUES, 440);
    const duration = getProp(props, DURATION_VALUES, 100);
    const wave = getProp(props, WAVE_VALUES, 'square');
    const wait = getProp(props, WAIT_VALUES, 'false');

    beep(vol, pitch, duration, wave);
    if (wait) await sleep(duration);
};

export default Beep;
