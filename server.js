const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/socket', createProxyMiddleware({
  target: 'https://144.202.16.218:3000',
  changeOrigin: true,
  ws: true,
  secure: false, // ignora el certificado SSL inválido
  pathRewrite: {
    '^/socket': ''
  }
}));

app.listen(3000, () => {
  console.log('Proxy listening on port 3000');
});
