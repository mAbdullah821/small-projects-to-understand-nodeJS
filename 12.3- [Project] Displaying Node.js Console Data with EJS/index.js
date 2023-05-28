const http = require('http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

const port = 3000;
const localhost = '127.0.0.1';

const naturePath = path.join(__dirname, './images/Nature/');
const quotesPath = path.join(__dirname, './images/Quotes/');
const dbPath =
  '../12.2- nodeJs console application with [Sync fs]/todoList.json';

const readDB = (render) => {
  return fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      throw new Error("Can't read the data");
    }
    render(JSON.parse(data));
    return 'Good';
  });
};

const badRequest = (res) => {
  res.statusCode = 404;
  res.end(
    '<h1 style="text-align: center; max-width: 50%; margin: 1rem auto;">404 Not Found<h1>'
  );
};

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'text/html');
  if (req.url === '/') {
    const renderHome = (data) => {
      ejs
        .renderFile('./pages/home.ejs', {
          url: '/',
          title: 'Home page',
          data,
        })
        .then((html) => res.end(html));
    };
    readDB(renderHome);
  } else if (req.url === '/nature' || req.url === '/quotes') {
    const imgType = req.url.split('/').at(-1); // ex. nature
    const capImgType = imgType.charAt(0).toUpperCase() + imgType.slice(1); // ex. Nature
    fs.readdir(imgType === 'nature' ? naturePath : quotesPath, (err, files) => {
      if (err) {
        console.log(err);
        throw new Error("can't read the directory");
      }
      const imgTypes = ['.jpeg', '.png', '.jpg'];
      const images = files
        .map((img) => {
          if (imgTypes.includes(path.extname(img)))
            return path.join(`./images/${capImgType}/`, img);
          else return '';
        })
        .filter((url) => url.length > 0);

      ejs
        .renderFile(`./pages/quotes_nature.ejs`, {
          url: `/${imgType}`,
          title: `${capImgType}`,
          imgs: images,
        })
        .then((html) => res.end(html));
    });
  } else if (req.url.startsWith('/images')) {
    try {
      fs.readFile('.' + req.url.replace(/%20/g, ' '), (err, img) => {
        if (err) {
          console.log(err);
          throw new Error("can't read the image");
        }
        res.setHeader('content-type', 'image/jpg');
        res.end(img);
      });
    } catch (err) {
      badRequest(res);
      console.log(err);
    }
  } else {
    badRequest(res);
  }
});

server.listen(port, localhost, () => {
  console.log(`Server is listening on port: ${port}`);
});
