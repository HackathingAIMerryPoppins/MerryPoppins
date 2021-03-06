import axios from 'axios';
import get from 'lodash/get';
import moment from 'moment';
import { textToSSML } from './ssmlHelp';

const cache = {
  'child abuse':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'TEDTalks Kids and Family - Stories from a home for terminally ill children',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/eed3e24c-25cf-4483-ad52-b7fb59832883_48.mp3'
    },
  'my child lying to me':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'TEDTalks Kids and Family - How an old loop of railroads is changing the face of a city',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/2fc4c8da-0197-4e20-a1ca-b07e90d39b06_48.mp3'
    },
  water:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'TEDTalks Kids and Family - A young scientists quest for clean waterby Deepika Kurup',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/a156a83b-7815-4978-9d5c-99b1d4651432_48.mp3'
    },
  stupid:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #313 Bilingualism and Language Delay in Toddlers',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/ebb9bf92-26cb-4c66-b57b-31eeead045f5_48.mp3'
    },
  'for love':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #308 This Kid Doesnt Play! Solutions for Common Problems - Part 6 - Transitions',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/f3d0427d-20d7-45fa-ae34-dc106ed2a2d0_48.mp3'
    },
  love:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #308 This Kid Doesnt Play! Solutions for Common Problems - Part 6 - Transitions',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/f3d0427d-20d7-45fa-ae34-dc106ed2a2d0_48.mp3'
    },
  language:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #313 Bilingualism and Language Delay in Toddlers',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/ebb9bf92-26cb-4c66-b57b-31eeead045f5_48.mp3'
    },
  'stupid child':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #313 Bilingualism and Language Delay in Toddlers',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/ebb9bf92-26cb-4c66-b57b-31eeead045f5_48.mp3'
    },
  'my kid':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #310 This Kid Doesnt Play! Solutions for  Common Problems...Echolalia',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/3971ebef-a46c-4c38-94b7-66af9db1b5dc_48.mp3'
    },
  'my kid hitting other kids':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - My Daughters Friend is a Bad Influence',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/fb9d6055-8287-41a0-ad78-c97fa6f69626_48.mp3'
    },
  lying:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'TEDTalks Kids and Family - Easy DIY projects for kid engineersby Fawn Qiu',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/91ed2704-c022-4b25-a4d6-ceb97670f941_48.mp3'
    },
  'learning a second language':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'TEDTalks Kids and Family - How to design a library that makes kids want to read by Michael Bierut',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/24912b6f-50ca-4853-ab1c-35e398876ead_48.mp3'
    },
  cognitive:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #311 - 7 Characteristics that Differentiate Autism from Other Language Delays',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/a3831815-2241-4750-bb16-b153a8e515c8_48.mp3'
    },
  'child child':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - Help Me Stop Yelling at My Child',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/3e68ba44-8438-4273-9b7a-3fbe2c629a49_48.mp3'
    },
  child:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - Help Me Stop Yelling at My Child',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/3e68ba44-8438-4273-9b7a-3fbe2c629a49_48.mp3'
    },
  'giving child medicine':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - Helping Babies Take Their Medicine',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/daa3fa0f-7c28-4bc7-926a-e3cf094e5d6f_48.mp3'
    },
  'child medicine':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - Helping Babies Take Their Medicine',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/daa3fa0f-7c28-4bc7-926a-e3cf094e5d6f_48.mp3'
    },
  'child protection':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - No Tolerance for Bullying',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/617816dd-eb07-4c13-bece-384c2790a096_48.mp3'
    },
  bilingualism:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #313 Bilingualism and Language Delay in Toddlers',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/44f95eca-905f-4335-abee-044f5b7b40cb_48.mp3'
    },
  food:
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - Helping Babies Take Their Medicine',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/97c9bf70-7606-47d7-8811-ccd8193c21ae_48.mp3'
    },
  'my kid hitting another kid':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Respectful Parenting: Janet Lansbury Unruffled - My Daughters Friend is a Bad Influence',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/d5344335-0858-41e4-9d76-3b250dee8d11_48.mp3'
    },
  'my kid using thing another kid':
    {
      stationName: 'Janet Lansbury Podcast',
      showName:    'Teach Me To Talk with Laura and Friends - #311 - 7 Characteristics that Differentiate Autism from Other Language Delays',
      audioURL:    'https://storageaudiobursts.blob.core.windows.net/audio/4e4f0818-2948-42de-86b6-b6f68e950c62_48.mp3'
    }
};

cache['child lying to me'] = cache['my child lying to me'];
cache['kid hitting another kid'] = cache['my kid hitting another kid'];
cache['kid hitting other kids'] = cache['my kid hitting other kids'];

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
  console.log('Searching URL: ', url);

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
      headers:      { 'Ocp-Apim-Subscription-Key': '0e4b6c99e0f94e98a473444c93109230' },
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

        const title = get(response.data, 'value[0].title', '').replace('\'', '');
        const stationName = get(response.data, 'value[0].stationName', '').replace('\'', '');
        const showName = get(response.data, 'value[0].showName', '').replace('\'', '');
        const audioURL = get(response.data, 'value[0].audioURL', '').replace('\'', '');

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
        console.log('Uh oh. Error encountered inside. Error was: ', error.message);
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

        console.log('Error encountered: kill your child. Error was: ', error.message);
        res.json({
          userId:    '123',
          messageId: '324',
          SSML:      `<speak>uh oh! Exception handled outside</speak>`
        });
      }
    });

}
