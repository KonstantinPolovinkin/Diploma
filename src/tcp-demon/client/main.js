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
  
function fillArray() {
  siMethods.forEach((method) => {
    try {
      si[`${method}`]().then(data => hwInfo.push(data));
      } catch(err) {
        console.log(err);
      }
  });
}
  
function writeFileClientSide(data) {
  fs.writeFile('./hwInfo.json', data, (err) => {
    if (err)
    console.log(err);
  });
}
  
function main() {
  fillArray();
  writeFileClientSide('');
  
  setTimeout(() =>
  writeFileClientSide(JSON.stringify(hwInfo)),
    40000);

  setTimeout(() =>
  sendFileToServer(),
    40000);
}
  
(function () {
  const scheduledSendFile = schedule.scheduleJob('42 * * * * *', function(){
    main();
  });
})();