const express = require('express');
const Morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { CLIENT_ORIGIN, DATABASE_URL, PORT } = require('./config');
const index = require('./routes/index');
const users = require('./routes/users');
const programs = require('./routes/programs');

const app = express();

mongoose.Promise = global.Promise;
app.use(Morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/', index);
app.use('/users', users);
app.use('/programs', programs)

app.use(cors({ origin: CLIENT_ORIGIN }));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/* 
const connectToDb = connArg => new Promise((resolve, reject) => {
  mongoose.connect(connArg, (err) => {
    if (err) reject(err);
  });
});

const logPort = (port) => {
  console.log(`The server is listening on port ${port}`);
};

const listenToServer = (port) => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve();
    })
      .on('error', reject);
  })
    .then(logPort(port));
};

const runServer = async (databaseUrl, port) => {
  try {
    await connectToDb(databaseUrl);
    await listenToServer(port);
  } catch (err) {
    mongoose.disconnect();
    throw err;
  }
}; 
runServer(DATABASE_URL, PORT).catch(err => console.log(`error: ${err}`));

*/


let server;

const runServer = (databaseUrl = DATABASE_URL, port = PORT) => {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', () => {
          mongoose.disconnect();
          reject(err);
        });
      return false;
    });
  });
};

const closeServer = () => {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close((err) => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}; 
 
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };
