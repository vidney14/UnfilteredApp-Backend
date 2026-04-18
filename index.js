require('dotenv').config();
const http = require('http');
const app = require('./src/app');
const initSocket = require('./src/socket');

const server = http.createServer(app);
initSocket(server);

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
