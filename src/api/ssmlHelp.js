import { version } from '../../package.json';
import Speech from 'ssml-builder';

export function textToSSML(speechLines = 'no text inputted') {

  try {
    const speech = new Speech();

    for (const line of speechLines.split('\n')) {
      if (line.trim() !== '') {
        speech.say(line.trim());
        speech.pause('1s');
      }
    }

    //
    // speech.say('Hello darkness my old friend');
    // speech.pause('1s');
    // speech.say("I've come to talk with you again");
    // speech.pause('1s');
    // speech.say('Because a vision softly creeping');
    // speech.pause('1s');
    // speech.say('Left its seeds while I was sleeping');
    // speech.pause('2s');
    // speech.say('And the vision that was planted in my brain');
    // speech.pause('1s');
    // speech.say('Still remains');
    // speech.pause('2s');
    // speech.say('Within the sound of silence');
    // speech.say('This is my phone number');
    // speech.sayAs({
    //   word: "+1-377-777-1888",
    //   interpret: "telephone"
    // });
    // speech.pause('1500ms');
    // speech.say('Call me!');
    const ssmlResult = speech.ssml(false);

    return ssmlResult;

  } catch (err) {
    return `<speak>uh oh! Exception handled, dude: {err}</speak>`;
  }
}


