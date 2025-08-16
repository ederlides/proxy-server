const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// CORS global: permite todas las conexiones (ajústalo si es necesario)
app.use(cors());

// Proxy para websocket/socket.io
app.use('/socket', createProxyMiddleware({
  target: 'https://144.202.16.218:3000',
  changeOrigin: true,
  ws: true,
  secure: false,
  pathRewrite: {
    '^/socket': ''
  },
  onProxyRes(proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*'; // Forzar encabezado si necesario
  }
}));

app.listen(3000, () => {
  console.log('Proxy listening on port 3000');
});

