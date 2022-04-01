'use strict';

import {sendFileToServer} from './tcp-client.js';
import schedule from 'node-schedule';
import si from 'systeminformation';
import fs from 'fs';
  
let hwInfo = [];
const siMethods = [
  'system',
  'bios',
  'baseboard',
  'chassis',
  'cpu',
  'mem',
  'graphics',
  'osInfo',
  'diskLayout',
  'networkInterfaces',
];
  
function fillArray(method) {
  return si[`${method}`]().then(data => hwInfo.push(data));
}
  
function writeFileClientSide(data) {
  fs.writeFile('./hwInfo.json', data, (err) => {
    if (err)
    console.log(err);
  });
}

async function fillArrayByMethods() {
  for(const method of siMethods) {
    try {
      const startFillArray = await fillArray(method);
    } catch(err) {
      console.log(err);
    }
  }
}
   
(async() => {
  const scheduledSendFile = schedule.scheduleJob('42 * * * * *', async function(){
  await fillArrayByMethods();
  writeFileClientSide('');
  writeFileClientSide(JSON.stringify(hwInfo));
  sendFileToServer();
  });
})();
