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
    secure: true,
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
        secure: true,
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
        secure: true,
    pathRewrite: {
      '^/project/react/Calculator': '',
    },
  })
);


// after your static + proxy middleware:
app.use(express.static(path.join(__dirname, 'public')));

// serve index.html for any non-API, non-project path
app.get(
  /^(?!\/(?:api|project)).*$/, 
  (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  }
);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
