const { Transform } = require('stream');

class Decrypt extends Transform {
  _transform(data, encoding, callback) {
    const mod = 256;
    for (let i = 0; i < data.length; i++) {
      data[i] = (((data[i] - 1) % mod) + mod) % mod;
    }

    callback(null, data);
  }
}

module.exports = Decrypt;
