const schedule = require('node-schedule');
const cp = require('child_process');

(function () {
  const job = schedule.scheduleJob('35 * * * * *', function(){
    const n = cp.fork('./getHW.js');
  });
})();
