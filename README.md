## Background

This project is a javascript debugging tool to play beeps as an alternative to Console logging.

## Install
$ npm install beepz

## Import
`import Beep from 'beepz'`<br/>
or<br/>
`import { Beep } from 'beepz';`<br/>
for simple import<br/><br/>

`import { Beep, OPTIONS } from 'beepz';`<br/>
to import with OPTIONS flags.


## Usage
`Beep();`<br/>

OPTIONS are flags which alter the beep:

LowVolume / MediumVolume / HighVolume<br/>
LowPitch / MediumPitch / HighPitch<br/>
LowDuration / MediumDuration / HighDuration<br/>
SquareWave / SineWave / TriangleWave<br/>
Wait

e.g.<br/>
`Beep(OPTIONS.LowVolume | OPTIONS.LowPitch | OPTIONS.MediumDuration | OPTION.SineWave);`<br/>

or<br/>
`Beep(OPTIONS.MediumVolume | OPTIONS.LowDuration);`

To wait for the beep to complete (e.g. to play a second beep afterwards, rather than at the same time) use async/await:

`(async () => {`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`    await Beep(OPTIONS.LongDuration | OPTIONS.Wait);`<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`    await Beep(OPTIONS.LongDuration | OPTIONS.Wait | OPTIONS.HighPitch);`<br/>
`})()`

## Licence
MIT &copy; Merchistoun
