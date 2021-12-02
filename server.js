const http = require('http');
const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  if (process.env.NODE_ENV === 'production') {
    const options = {
      key: fs.readFileSync('./keys/_.pdftron.com/pdftron-wildcard.key'),
      ca: [
        fs.readFileSync('./keys/_.pdftron.com/gd_bundle-g2-g1.crt'),
      ],
      cert: fs.readFileSync('./keys/_.pdftron.com/13c7eafdb20ea202.crt'),
    };

    https.createServer(options, (req, res) => {
      const parsedUrl = parse(req.url, true)

      handle(req, res, parsedUrl)
    }).listen(process.env.PROD_PORT, () => {
      console.log('Started HTTPS of OBS')
    });
  } else {
    http.createServer((req, res) => {
      const parsedUrl = parse(req.url, true)

      handle(req, res, parsedUrl)
    }).listen(process.env.DEV_PORT, () => {
      console.log('Started HTTP of OBS')
    })
  }
})