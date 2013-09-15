var fs = require('fs');
var handlebars = require('handlebars');
var reference = require('../reference.js');

var file = fs.readFileSync('./demo-peerjs.json');

var template = handlebars.compile(fs.readFileSync('./template-peerjs.html', {encoding: 'utf8'}));
fs.writeFile('./demo-peerjs.html', template({html: reference(file)}));
