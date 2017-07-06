import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';

export default ({ config, db }) => {
  let api = Router();

  // mount the facets resource
  api.use('/facets', facets({ config, db }));


  api.get('/test', (req, res) => {
    res.json({
      'userId':    '1233243254354',
      'messageId': '324509873209482093842903423',
      'SSML':      `<speak>Here is a number <w role="amazon:VBD">read</w>as a cardinal number:<say-as interpret-as="cardinal">12345</say-as>.Here is a word spelled out:<say-as interpret-as="spell-out">hello</say-as>.</speak>`
    });
  });

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
}


