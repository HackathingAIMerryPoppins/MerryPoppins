import { version } from '../../package.json';
import { Router } from 'express';
import get from 'lodash/get';
// import facets from './facets';

import Speech from 'ssml-builder';
import axios from 'axios';
import { textToSSML } from './ssmlHelp';

const useRemote = true;

function remoteCall(req, res) {
  const url = `http://1b61772e.ngrok.io/api${req.path}_local?q=` + req.query.q;
  console.log('calling: ', url);
  axios.get(url, { responseType: 'json', })
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json({
        userId:    '123',
        messageId: '324',
        SSML:      `<speak>uh oh! Exception handled: ${error}</speak>`
      });
    });
}

function test(req, res) {
  const speechLines = `
  Yesterday
  all my troubles seemed so far away.
  Now it looks as though they're here to stay
  Oh, I believe in yesterday.
  .
  Suddenly 
  I'm not half the man I used to be.
  There's a shadow hanging over me.
  Oh, yesterday came suddenly.
  .
  Why, she, had to go
  I don't know, she wouldn't say.
  I, said, something wrong
  now I long, for yesterday.
  .
  Yesterday
  love was such an easy game to play
  Now I need a place to hide away
  Oh, I believe, in yesterday.
`;

  res.json({
    'userId':    '1233243254354',
    'messageId': '324509873209482093842903423',
    // 'SSML2':      `<speak><say-as interpret-as="spell-out">merry</say-as> the best app in the world!<say-as interpret-as="spell-out">poppins</say-as> use me once and you'll be sold!</speak>`,
    SSML:        textToSSML(speechLines)
  });
}

function welcome(req, res) {
  const speechLines = `welcome welcome welcome`;

  res.json({
    'userId':    '1233243254354',
    'messageId': '324509873209482093842903423',
    // 'SSML2':      `<speak><say-as interpret-as="spell-out">merry</say-as> the best app in the world!<say-as interpret-as="spell-out">poppins</say-as> use me once and you'll be sold!</speak>`,
    SSML:        textToSSML(speechLines)
  });
}

function help(req, res) {
  const speechLines = `help help help`;

  res.json({
    'userId':    '1233243254354',
    'messageId': '324509873209482093842903423',
    // 'SSML2':      `<speak><say-as interpret-as="spell-out">merry</say-as> the best app in the world!<say-as interpret-as="spell-out">poppins</say-as> use me once and you'll be sold!</speak>`,
    SSML:        textToSSML(speechLines)
  });
}


function query(req, res) {
  const queryValue = get(req.query, 'q', 'UNKNOWN QUERY STRING');

  const speechLines = `query is ${queryValue}`;

  res.json({
    'userId':    '1233243254354',
    'messageId': '324509873209482093842903423',
    // 'SSML2':      `<speak><say-as interpret-as="spell-out">merry</say-as> the best app in the world!<say-as interpret-as="spell-out">poppins</say-as> use me once and you'll be sold!</speak>`,
    SSML:        textToSSML(speechLines)
  });
}


function answer(req, res) {
  const queryValue = get(req.query, 'q', 'UNKNOWN QUERY STRING');
  console.log('req.query:', req.query);
  const speechLines = `answer is ${queryValue}`;

  res.json({
    'userId':    '1233243254354',
    'messageId': '324509873209482093842903423',
    // 'SSML2':      `<speak><say-as interpret-as="spell-out">merry</say-as> the best app in the world!<say-as interpret-as="spell-out">poppins</say-as> use me once and you'll be sold!</speak>`,
    SSML:        textToSSML(speechLines)
  });
}


export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  // api.use('/facets', facets({ config, db }));


  const apis = {
    'test': test,
    'welcome': welcome,
    'help': help,
    'query': query,
    'answer': answer,
  };

  for (const apiName of Object.keys(apis)) {
    const apiFunc = apis[apiName];

    api.get(`/${apiName}`, (req, res) => {
      console.log(apiName + ' path:', req.path, 'qs:', req.query);
      if (useRemote) {
        return remoteCall(req, res);
      } else  {
        return apiFunc(req, res);
      }
    });

    api.get(`/${apiName}_local`, (req, res) => {
      return apiFunc(req, res);
    });
  }

  //
  //
  //
  //
  //
  //
  // api.get('/test', (req, res) => {
  //   console.log('TEST path:', req.path, 'qs:', req.query);
  //   if (useRemote) {
  //     return remoteCall(req, res);
  //   } else  {
  //    return test(req, res);
  //   }
  // });
  //
  // api.get('/test_local', (req, res) => {
  //   return test(req, res);
  // });
  //
  //
  //
  //
  //
  // api.get('/welcome', (req, res) => {
  //   console.log('WELCOME path:', req.path, 'qs:', req.query);
  //   if (useRemote) {
  //     return remoteCall(req, res);
  //   } else  {
  //     return welcome(req, res);
  //   }
  // });
  //
  // api.get('/welcome_local', (req, res) => {
  //   return welcome(req, res);
  // });

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version, apis });
  });

  return api;
}


