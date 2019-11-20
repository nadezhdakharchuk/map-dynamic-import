const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const routes = require('./routes');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60,
});

// eslint-disable-next-line consistent-return
function renderAndCache(req, res) {
  if (!dev && ssrCache.has(req.url)) {
    return res.send(ssrCache.get(req.url));
  }

  const { route, params } = routes.match(req.url);
  if (!route) return handle(req, res);

  app
    .renderToHTML(req, res, route.page, params)
    .then(html => {
      ssrCache.set(req.url, html);
      res.send(html);
    })
    .catch(err => {
      app.renderError(err, req, res, route.page, params);
    });
}

app.prepare().then(() => {
  const server = express();

  server.use(renderAndCache);

  server.get('*', (req, res) => {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      res.redirect(`https://${req.headers.host}${req.url}`);
    } else {
      handle(req, res);
    }
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
