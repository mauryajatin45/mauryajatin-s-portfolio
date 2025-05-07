const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// 1) Proxy for your TypingTest project
app.use(
  '/project/TypingTest',
  createProxyMiddleware({
    target: 'https://jatin-typing-speed-tester.netlify.app',
    changeOrigin: true,
    secure: true,
    pathRewrite: { '^/project/TypingTest': '' },
  })
);

// 2) Proxy for your VLC project
app.use(
  '/project/vlc',
  createProxyMiddleware({
    target: 'https://vlc-web-media-player.netlify.app',
    changeOrigin: true,
    secure: true,
    pathRewrite: { '^/project/vlc': '' },
  })
);

app.use(
  '/project/react/weather',
  createProxyMiddleware({
    target: 'https://jatinreactweather.netlify.app/',
    changeOrigin: true,
    pathRewrite: {
      '^/project/react/weather': '',
    },
  })
);

app.use(
  '/project/react/lotteryGame',
  createProxyMiddleware({
    target: 'https://lottery-game-tawny.vercel.app/',
    changeOrigin: true,
    pathRewrite: {
      '^/project/react/lotteryGame': '',
    },
  })
);

app.use(
  '/project/react/Calculator',
  createProxyMiddleware({
    target: 'https://jatin-calc.netlify.app/',
    changeOrigin: true,
    pathRewrite: {
      '^/project/react/Calculator/': '',
    },
  })
);


// 3) Serve your own static files (including index.html at '/')
app.use(express.static(path.join(__dirname, 'public')));

// No app.get('*') needed—Express.static will serve index.html at '/', and
// your two proxies will catch anything under /project/TypingTest/* and /project/vlc/*.

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
