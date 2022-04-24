'use strict';

import path from 'path';
import si from 'systeminformation';
import {exec} from 'child_process';
import {sendInfoToServer} from './client.js';

let hwInfo = [];
const SI_METHODS = [
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

function setTask() {
  exec(path.join('schTask/createTask.bat'), (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(stdout);
  });
}

function fillArray(method) {
  return si[`${method}`]().then(data => hwInfo.push(data));
}

async function fillArrayByMethods() {
  try {
    for (const method of SI_METHODS) {
      await fillArray(method);
    }
  } catch (err) {
    console.log(err);
  }
}

(async () => {
  await fillArrayByMethods();
  sendInfoToServer(hwInfo);
  setTask();
})();
