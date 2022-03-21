const spawn = require('child_process').spawn;
child = spawn('powershell.exe',['./getHW.ps1']);

child.stderr.on('data', function(data) {
  console.log('Powershell Errors: ' + data);
});
child.on('exit', function() {
  console.log('Powershell Script Finished');
});
child.stdin.end();