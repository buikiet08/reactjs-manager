const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: import.meta.env.VITE_DEFAULT, // Thay đổi thành địa chỉ và cổng Node.js của bạn
      changeOrigin: true,
    })
  );
};
