const { app, runServer, closeServer } = require('./app');
const { PORT } = require('./config');

app.listen(PORT, () => {
  console.log(`The app is listening on port ${PORT}`);
});