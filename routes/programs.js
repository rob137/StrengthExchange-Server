const express = require('express');
const router = express.Router();
const { User, ProgramData } = require('../models');

/* GET programs. */
router.get('/', (req, res) => {
  User
    .find()
    .then((user) => {
      res.status(200).json({
        program: user.map(user => user.programs.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
