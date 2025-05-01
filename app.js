const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware'); // Import proxy middleware

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Proxy for "/project/bhaichat"
app.use('/project/bhaichat', createProxyMiddleware({
    target: 'https://bhaichat.vercel.app',  // The URL to forward to
    changeOrigin: true,  // Allow cross-origin requests
    pathRewrite: {
        '^/project/bhaichat': '/login',  // Route "/project/bhaichat" to "/login" on target
    },
    onProxyRes: (proxyRes, req, res) => {
        // You can modify the response headers if needed
        proxyRes.headers['X-Forwarded-For'] = req.connection.remoteAddress;
    }
}));

// Catch-all route to handle any non-proxy requests (like your homepage, etc.)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Default HTML file to serve
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
