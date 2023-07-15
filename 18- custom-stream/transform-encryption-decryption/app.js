const { pipeline } = require('stream');
const Encrypt = require('./encryption');
const Decrypt = require('./decryption');
const fs = require('fs');

const readInputFile = fs.createReadStream('inputData.txt');
const writeEncryptionFile = fs.createWriteStream('encryption.txt');
const readEncryptionFile = fs.createReadStream('encryption.txt');
const writeDecryptionFile = fs.createWriteStream('decryption.txt');

const encrypt = new Encrypt();
const decrypt = new Decrypt();

pipeline(readInputFile, encrypt, writeEncryptionFile, (err) => {
  if (err) console.log(err);
  else {
    console.log('Encryption is completed');

    // --------------------

    pipeline(readEncryptionFile, decrypt, writeDecryptionFile, (err) => {
      if (err) console.log(err);
      else console.log('Decryption is completed');
    });
  }
});
