const express = require('express');
require('dotenv').config();
const Morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { CLIENT_ORIGIN, DATABASE_URL, PORT } = require('./config');
const indexRouter = require('./routes/index');
const programsRouter = require('./routes/programs');
const daysRouter = require('./routes/days');
const passport = require('passport');
const { router: authRouter, localStrategy, jwtStrategy } = require('./auth');
const { router: usersRouter } = require('./users');
// const usersRouter = require('./users/router');

const app = express();

mongoose.Promise = global.Promise;
app.use(Morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(cors({ origin: CLIENT_ORIGIN }));

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/programs', programsRouter);
app.use('/days', daysRouter);
app.use('/auth', authRouter);

const jwtAuth = passport.authenticate('jwt', { session: false });

app.get('/api/protected', jwtAuth, (req, res) => res.json({
  data: 'rosebud',
}));

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
