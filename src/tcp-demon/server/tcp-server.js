'use strict';

import argon2 from 'argon2';
import net from 'net';
import fs from 'fs';

async function verifyPassword(CURRENT_DEMON_INSTANCE_PASSWORD) {
  const hwInfoFullPath = '200670621308384';

  if (!fs.existsSync(`./${hwInfoFullPath}/hash.json`)) {
    try {
      const hash = await argon2.hash(CURRENT_DEMON_INSTANCE_PASSWORD);
      fs.writeFileSync(`./${hwInfoFullPath}/hash.json`, JSON.stringify(hash));
      return 1;
    } catch(err) {
      console.log(err);
    }  
    
  } else {  
    try {      
      if (await argon2.verify(JSON.parse(fs.readFileSync(`./${hwInfoFullPath}/hash.json`)), CURRENT_DEMON_INSTANCE_PASSWORD)) {
        console.log('ok');
        return 1;
      } else {
        console.log('not ok');
        return 0;
      }
    } catch (err) {
      console.log(err);
    }
  }
}

async function CreateStorageDir(HWstorageDirectory) {
  if (!fs.existsSync(HWstorageDirectory)) {
    fs.mkdirSync(HWstorageDirectory);
  }
}

async function getBaseBoardSerial(data) {
    const baseBoardSerial = JSON.parse(data)[2].serial;
    const HWstorageDirectory = `./${baseBoardSerial}`;
    const hwInfoFullPath = `./${HWstorageDirectory}/${baseBoardSerial}.json`;

  await CreateStorageDir(HWstorageDirectory);
  WriteLocalFile(data, hwInfoFullPath);
}

function WriteLocalFile(data, hwInfoFullPath) {
  const hwinfo = JSON.stringify(JSON.parse(data), null, 2);
  fs.writeFile(hwInfoFullPath, hwinfo, (err) => {
    if (err)
      console.log(err);
  });
}

net.createServer(socket => {
  console.log('client connected');
  console.dir(socket.address());

  socket.setNoDelay(false);
  socket.on('data', async (data) => {
    const isItPassword = data.toString('utf8').startsWith('password');
    if (isItPassword) {
      const getPassword = data.toString('utf8').slice(9);
      if (await verifyPassword(getPassword)) {
        socket.write('ok');
      } else {
        socket.write('not ok');
      }
    } else {
      getBaseBoardSerial(data);
    }
  });
  socket.on('end', () => {
    console.log(`client ${socket.address().address} disconnected`);
  });
}).listen(2000);
