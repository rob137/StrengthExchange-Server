const express = require('express');
const router = express.Router();
const { Users } = require('../models');

/* GET users listing. */
router.get('/', (req, res) => {
  Users
    .find({ type: 'user' })
    .then((users) => {
      res.status(200).json({
        users: users.map(user => user.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/* POST new user on registration. */
router.post('/', (req, res) => {
  Users
    .create({})
    .then()
    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
