// Local imports
const app = require('./app.js');
const server = require('./src/db/index');

// PORT config
const PORT = 4000;

// Application message
const listen = app.listen(PORT, () => {
  const msg = (`Server is running on port ${PORT}`);
  console.log(msg);
});

// Start server
server.connect()
  .then(() => {
    return listen
  });