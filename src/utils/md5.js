const crypto = require('crypto');
const fs = require('fs');

function md5(string, encoding = 'hex') {
  return crypto
    .createHash('md5')
    .update(string)
    .digest(encoding);
}

md5.file = function(filename) {
  return new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(crypto.createHash('md5').setEncoding('hex'))
      .on('finish', function() {
        resolve(this.read());
      })
      .on('error', reject);
  });
};

module.exports = md5;
