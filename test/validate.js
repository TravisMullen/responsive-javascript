var bowerJson = require('bower-json');

var json = {
    name: 'my-package',
    version: '0.0.1'
};

try {
    bowerJson.parse(json);
} catch (err) {
    console.error('There was an error parsing the object');
    console.error(err.message);
}