var _data = require('../_harp/posts/_data.json');
var program = require('commander');
var fs = require('fs');
var path = require('path');

program.option('-i, --id [id]', 'id of the blog to remove').parse(process.argv);

if (!program.id) {
  program.help();
}

var deleted = null;

for (var k in _data) {
  var p = _data[k];
  if (p.id === parseInt(program.id)) {
    deleted = {
      id: p.id,
      title: p.title
    };
    delete _data[k];
    break;
  }
}

fs.writeFile(path.join(__dirname, '../_harp/posts/_data.json'), JSON.stringify(_data, null, '\t'), function () {
  console.log(deleted);
});