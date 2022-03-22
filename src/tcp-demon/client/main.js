const si = require('systeminformation');
const fs = require('fs');

const hwInfo = [];

si.system()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.bios()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.baseboard()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.chassis()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.cpu()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.mem()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.graphics()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.osInfo()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

si.diskLayout()
  .then(data => hwInfo.push(data))
  .catch(error => console.error(error));

function writeFile() {
  fs.writeFile('./hwInfo.json', JSON.stringify(hwInfo), (err) => {
    if (err)
      console.log(err);
  });
}
setTimeout(() => writeFile(), 10000);