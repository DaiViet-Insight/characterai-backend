const server = require('http').createServer();
const port = 3005;
const app = require('./app.js');

server.on('request', app);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);