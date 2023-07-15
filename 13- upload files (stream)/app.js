require('dotenv').config();
const express = require('express');
const fs = require('fs');
const multer = require('multer');
const { performance } = require('perf_hooks');
const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const app = express();
const PORT = 5050;

app.use(express.static(__dirname + '/public'));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ----------------------------------- (disk__upload) -------------------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/public/upload');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split('.').pop();
    cb(
      null,
      file.mimetype.replace('/', '-') + '-' + uniqueSuffix + '.' + extension
    );
  },
});

const diskUpload = multer({ storage });

app.post('/disk/upload', diskUpload.single('upload_file'), async (req, res) => {
  console.log((req.file.size / 1024).toFixed(2), ' KB');

  const startTime = performance.now();

  // ----------- Readable-Writable Streams -----------
  const readableStream = fs.createReadStream(req.file.path);
  const splittedPath = req.file.path.split('.');
  const copiedFilePath = splittedPath[0] + '-copy' + '.' + splittedPath.pop();
  const writableStream = fs.createWriteStream(copiedFilePath);
  await readableStream.pipe(writableStream);

  // ----------- Upload to cloudinary ----------------
  try {
    const file = await cloudinary.uploader.upload(req.file.path, {
      folder: 'test_file_upload',
    });

    const endTime = performance.now();

    res.send({
      msg: 'File has been uploaded successfully!',
      time: `The upload took ${((endTime - startTime) / 1000).toFixed(
        3
      )} seconds`,
      localUrl: '/upload/' + req.file.filename,
      globalUrl: file.secure_url,
    });
  } catch (err) {
    console.log(err);
    res.send({ msg: 'error' });
  }
});

// ----------------------------------- (memory__upload) -------------------------------

const streamUpload = (req) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'test_file_upload' },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

const memoryUpload = multer();
app.post(
  '/memory/upload',
  memoryUpload.single('upload_file'),
  async (req, res) => {
    console.log((req.file.size / 1024).toFixed(2), ' KB');

    const startTime = performance.now();

    // ----------- Upload to cloudinary ----------------
    try {
      const file = await streamUpload(req);

      const endTime = performance.now();

      res.send({
        msg: 'File has been uploaded successfully!',
        time: `The upload took ${((endTime - startTime) / 1000).toFixed(
          3
        )} seconds`,
        globalUrl: file.secure_url,
      });
    } catch (err) {
      console.log(err);
      res.send({ msg: 'error' });
    }
  }
);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
