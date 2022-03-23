'use strict';

const { app } = require('electron');
const schedule = require('node-schedule');
const si = require('systeminformation');
const fs = require('fs');

const hwInfo = [];
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

function writeFile(data) {
  fs.writeFile('./hwInfo.json', data, (err) => {
    if (err)
    console.log(err);
  });
}

function main() {
  fillArray();
  writeFile('');

  setTimeout(() =>
    writeFile(JSON.stringify(hwInfo)),
    20000);
    
  // doesn't work, writes an empty array
  // setTimeout(() => 
  //   app.quit(),
  //   20000);
}

app.whenReady().then(() => {
  (function () {
    const scheduledJob = schedule.scheduleJob('42 * * * * *', function(){
      main();
    });
  })();
})