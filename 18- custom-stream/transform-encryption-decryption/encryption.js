const { Transform } = require('stream');

class Encrypt extends Transform {
  _transform(data, encoding, callback) {
    const mod = 256;
    for (let i = 0; i < data.length; i++) {
      data[i] = (data[i] + 1) % mod;
    }

    callback(null, data);
  }
}

module.exports = Encrypt;
