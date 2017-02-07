/**
 charp compile ./_harp ./_harp/www/
 rm -rf ./_harp/www/.idea ./_harp/www/bin
 cp -a ./_harp/www/* ./
 rm -rf ./_harp/www/*
 git status
 read -p '    Sure to commit and push? (y/n) ' SURE
 if [ "$SURE" = y ]; then
 git add .
 read -p '    Commit message: ' MSG
 git commit -m "$MSG"
 git push
 fi
 **/
const readline = require('readline');
const shell = require('shelljs');
const path = require('path');
const src = path.resolve(__dirname, '../_harp');
const tempWWW = path.resolve(src, './www/');
const root = path.resolve(__dirname, '../');
const charp = require('charp');

console.log('compiling...');
charp.compile(src, tempWWW, (e, config) => {
  if (e) {
    return console.log('compile error:', e);
  }
  // console.log('harp compile result:', e, config);
  shell.rm('-rf', path.resolve(tempWWW, './.idea'), path.resolve(tempWWW, './bin'));
  shell.cp('-rf', path.resolve(tempWWW, './*'), root);
  shell.rm('-rf', path.resolve(tempWWW, './*'));
  shell.exec(`git status ${root}`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question('    Sure to commit and push? (y/n) ', answer => {
    if(answer.trim().toLowerCase() === 'y') {
      shell.exec(`git add ${root}`);
      rl.question('    Commit message: ', msg => {
        if (msg.trim() == '') {
          msg = 'no message';
        }
        shell.exec(`git commit -m "${msg}"`);
        shell.exec('git push');
        rl.close();
      })
    } else {
      rl.close();
    }

  });
});