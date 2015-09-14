require('../utils/date.js');
var readline = require('readline');
var async = require('async');
var fs = require('fs');
var path = require('path');
var _data = require('../_harp/posts/_data.json');

var nextId = 0;
for (var k in _data) {
  if (_data.hasOwnProperty(k)) {
    if (nextId<=_data[k].id) {
      nextId = _data[k].id + 1;
    }
  }
}

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var title = '', date = '', keywords = '';

var tasks = [];

tasks.push(function (cb) {
  rl.question("Title: ", function (answer) {
    title = answer.trim();
    cb(null, title);
  });
});

tasks.push(function (cb) {
  rl.question("Keywords: ", function (answer) {
    keywords = answer;
    cb(null, keywords);
  });
});

tasks.push(function (cb) {
  rl.question("Date: ", function (answer) {
    if (!answer || answer.trim() == '') {
      date = new Date().toString('yyyy-MM-dd');
    } else {
      date = answer;
    }
    cb(null, date);
  });
});

async.series(tasks, function () {
  var fileName = encodeURIComponent(title.replace(/\s+/g,'-')).replace(/%/g, '');
  var insertStr = '<h1>' + title + '<sub>' + date + '</sub></h1>';
  var fp = path.join(__dirname, '../_harp/posts/', fileName + '.md');
  console.log(fp);
  fs.writeFile(fp, insertStr, function () {
    _data[fileName] = {
      title: title,
      date: date,
      keywords: keywords,
      id: nextId
    };
    fs.writeFile(path.join(__dirname, '../_harp/posts/_data.json'), JSON.stringify(_data, null, '\t'), function () {
      rl.close();
      process.exit(0);
    });
  });
});

