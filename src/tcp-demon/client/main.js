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
];
  
async function fillArray(method) {
  await si[`${method}`]().then(data => hwInfo.push(data));
  writeFileClientSide(JSON.stringify(hwInfo));
  sendFileToServer();
}
  
function writeFileClientSide(data) {
  fs.writeFile('./hwInfo.json', data, (err) => {
    if (err)
    console.log(err);
  });
}

function fillArrayByMethods() {
  siMethods.forEach((method) => {
    try {
      fillArray(method);
    } catch(err) {
      console.log(err)
    }
  });
}
  
function main() {
  writeFileClientSide('');
  fillArrayByMethods();  
}
  
(function () {
  const scheduledSendFile = schedule.scheduleJob('42 * * * * *', function(){
    main();
  });
})();
