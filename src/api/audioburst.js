import axios from 'axios';
import get from 'lodash/get';
import moment from 'moment';
import { textToSSML } from './ssmlHelp';

const cache = {
  'child abuse': {
    stationName: 'Janet Lansbury Podcast',
    showName: 'TEDTalks Kids and Family - Stories from a home for terminally ill children',
    audioURL: 'https://storageaudiobursts.blob.core.windows.net/audio/eed3e24c-25cf-4483-ad52-b7fb59832883_48.mp3',
  },
  'my child lying to me': {
    stationName: 'Janet Lansbury Podcast',
    showName: 'TEDTalks Kids and Family - How an old loop of railroads is changing the face of a city',
    audioURL: 'https://storageaudiobursts.blob.core.windows.net/audio/2fc4c8da-0197-4e20-a1ca-b07e90d39b06_48.mp3',
  },
};

export function answerQuestion(req, res) {
  const queryValue = decodeURIComponent(get(req.query, 'q', 'UNKNOWN QUERY STRING'));
  let speechLines;

  if (queryValue === '') {
    res.json({
      userId:    '123',
      messageId: '345',
      SSML:      textToSSML('Oops, I, Merry Poppins, could not hear your question.'),
    });
    return;
  }
  //
  // var options = {
  //   'host': 'developersapi.audioburst.com',
  //   'path': '/v1/search?&q=' + queryValue + '&fromDate=1/1/2016&stationId=12386,12292,12759&device=alexa HTTP/1.1',
  //
  // };


  const startTime = moment();

  const url = 'http://developersapi.audioburst.com/v1/freesearch?&q=' + queryValue + '&stationIds=12759&device=alexa&top=3';
  console.log("Searching URL: ", url);

  const fastResult = cache[queryValue];
  if (fastResult) {
    console.log('Fast result found for ', queryValue);

    const answer = `You asked for help with ${queryValue}. I found a releveant podcast in the station ${fastResult.stationName}, named, ${fastResult.showName}`;

    const result = {
      userId:    '123',
      messageId: '345',
      SSML:      textToSSML(answer, fastResult.audioURL),
    };

    res.json(result);
    return;
  }

  axios.get(
    //'http://developersapi.audioburst.com//v1/search?&q=' + queryValue + '&fromDate=1/1/2016&stationId=12386,12292,12759&device=alexa',
    url,
    {
      responseType: 'json',
      headers:      { 'Ocp-Apim-Subscription-Key': 'affaf025b4114285ad506aadeecee4f5' },
      timeout:      30000,
    })
    .then(function (response) {

      try {

        console.log('Got response data: ', response.data);
        console.log('got response data');

        const valueArr = get(response.data, 'value', []);
        if (!valueArr || valueArr.length == 0) {
          res.json({
            userId:    '123',
            messageId: '324',
            SSML:      textToSSML(`Sorry, I couldn't find anything. Maybe try rephrasing your question.`)
          });

          return;
        }

        const endTime = moment();
        const diff = moment.duration(endTime.diff(startTime));

        //const diff = endTime.diff(startTime).format('HH:mm:ss');

        console.log('Result returned after ', diff.asSeconds(), ' seconds.');
        //console.log();

        //const answer = get(response.data, 'bursts[0].title', 'oopsie whoopsie');
        let answer = 'oh no!';

        const title = get(response.data, 'value[0].title', '').replace("'", "");
        const stationName = get(response.data, 'value[0].stationName', '').replace("'", "");
        const showName = get(response.data, 'value[0].showName', '').replace("'", "");
        const audioURL = get(response.data, 'value[0].audioURL', '').replace("'", "");

        cache[queryValue] = {
          stationName,
          showName,
          audioURL,
        };

        if (title != '' && stationName != '' && showName != '') {
          answer = `You asked for help with ${queryValue}. I found a releveant podcast in the station ${stationName}, named, ${showName}.`;
        } else {
          answer = `You asked for help with ${queryValue}. I found a releveant podcast called: ${title}.`;
        }

        // answer = 'yo yo yo';
        console.log('Returning answer: ', answer);

        const result = {
          userId:    '123',
          messageId: '345',
          SSML:      textToSSML(answer, audioURL),
        };

        console.log('result is:', result);

        res.json(result);
      } catch (error) {
        console.log("Uh oh. Error encountered inside. Error was: ", error.message);
        res.json({
          userId:    '123',
          messageId: '324',
          SSML:      `<speak>uh oh! Exception handled inside</speak>`
        });
      }

      console.log('Latest cache:');
      console.log(cache);
    })
    .catch(function (error) {
      if (error.message.includes('timeout')) {

        console.log('timeout!');
        res.json({
          userId:    '123',
          messageId: '324',
          SSML:      `<speak>Audioburst API has timed out.</speak>`
        });

      } else {

        console.log("Error encountered: kill your child. Error was: ", error.message);
        res.json({
          userId:    '123',
          messageId: '324',
          SSML:      `<speak>uh oh! Exception handled outside</speak>`
        });
      }
    });

}
