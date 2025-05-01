const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 1) Your main app’s static files
app.use(express.static(path.join(__dirname, 'public')));

// 2) One proxy rule for TypingTest (HTML + all its assets)
app.use(
  '/project/TypingTest',
  createProxyMiddleware({
    target: 'https://jatin-typing-speed-tester.netlify.app',
    changeOrigin: true,
    secure: true,
    pathRewrite: {
      '^/project/TypingTest': '',   // /project/TypingTest/foo → /foo on Netlify
    },
    onProxyRes(proxyRes) {
      // optional tagging
      proxyRes.headers['X-Proxy-By'] = 'mauryajatin.me';
    },
  })
);

// 3) Fallback for everything else in your full-stack app
app.get('', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
