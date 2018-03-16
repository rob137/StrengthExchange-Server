const express = require('express');
const router = express.Router();
const { User } = require('../models');

/* GET users listing. */
router.get('/', (req, res) => {
  User
    .find()
    .then((user) => {
      res.status(200).json({
        user: user.map(user => user.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
