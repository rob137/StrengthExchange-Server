const express = require('express');
const bodyParser = require('body-parser');

const { User } = require('./models');

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to register a new user
router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['email', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Missing field',
      location: missingField,
    });
  }

  const stringFields = ['email', 'password', 'firstName', 'lastName'];
  const nonStringField = stringFields
    .find(field => field in req.body && typeof req.body[field] !== 'string');

  if (nonStringField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Incorrect field type: expected string',
      location: nonStringField,
    });
  }

  const explicitlyTrimmedFields = ['email', 'password'];
  const nonTrimmedField = explicitlyTrimmedFields
    .find(field => req.body[field].trim() !== req.body[field]);

  if (nonTrimmedField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: 'Cannot start or end with whitespace',
      location: nonTrimmedField,
    });
  }

  const sizedFields = {
    email: {
      min: 1,
    },
    password: {
      min: 7,
      max: 72,
    },
  };
  const tooSmallField = Object.keys(sizedFields)
    .find((field) => {
      return 'min' in sizedFields[field]
      && req.body[field].trim().length < sizedFields[field].min;
    });
  const tooLargeField = Object.keys(sizedFields)
    .find((field) => {
      return 'max' in sizedFields[field]
      && req.body[field].trim().length > sizedFields[field].max;
    });

  if (tooSmallField || tooLargeField) {
    return res.status(422).json({
      code: 422,
      reason: 'ValidationError',
      message: tooSmallField
        ? `Must be at least ${sizedFields[tooSmallField].min} characters long.`
        : `Must be at most ${sizedFields[tooLargeField].max} characters long.`,
      location: tooSmallField || tooLargeField,
    });
  }

  const { email, password } = req.body;
  let { firstName = '', lastName = '' } = req.body;
  firstName = firstName.trim();
  lastName = lastName.trim();

  return User.find({ email })
    .count()
    .then((count) => {
      if (count > 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Email already taken',
          location: 'email',
        });
      }
      return User.hashPassword(password);
    })
    .then(hash => User.create({
      email,
      password: hash,
      firstName,
      lastName,
    }))
    .then(user => res.status(201).json(user.serialize()))
    .catch((err) => {
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ code: 500, message: 'Internal server error' });
    });
});

module.exports = { router };
