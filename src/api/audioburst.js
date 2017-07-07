import axios from 'axios';
import get from 'lodash/get';
import moment from 'moment';
import { textToSSML } from './ssmlHelp';

export function answerQuestion(req, res) {
  const queryValue = decodeURIComponent(get(req.query, 'q', 'UNKNOWN QUERY STRING'));
  let speechLines;

  if (queryValue === '') {
    res.json({
      userId:    '123',
      messageId: '345',
      SSML:      textToSSML('Oops, I couldn\'t hear your question.'),
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

  const url = 'http://developersapi.audioburst.com/v1/freesearch?&q=' + queryValue + '&stationIds=12759&device=alexa';
  console.log("Searching URL: ", url);
  axios.get(
    //'http://developersapi.audioburst.com//v1/search?&q=' + queryValue + '&fromDate=1/1/2016&stationId=12386,12292,12759&device=alexa',
    url,
    {
      responseType: 'json',
      headers:      { 'Ocp-Apim-Subscription-Key': 'affaf025b4114285ad506aadeecee4f5' },
      timeout:      5000,
    })
    .then(function (response) {

      //console.log('Got response data: ', response.data);
      console.log('got response data');

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

      if (title != '' && stationName != '' && showName != '') {
        answer = `You asked for help with ${queryValue}. I found a releveant podcast in the station ${stationName}, named, ${showName}`;
      } else {
        answer = `You asked for help with ${queryValue}. I found a releveant podcast called: ${title}`;
      }

      console.log('Returning answer: ', answer);

      const result = {
        userId:    '123',
        messageId: '345',
        SSML:      textToSSML(answer),
      };

      console.log('result is:', result);

      res.json(result);
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
          SSML:      `<speak>uh oh! Exception handled</speak>`
        });
      }
    });

}
