const express = require('express');
const router = express.Router();
const { Users, Programs } = require('../models');

/* GET programs. */
router.get('/', (req, res) => {
  Users
    .find()
    .then((users) => {
      res.status(200).json({
        programs: users.map(user => user.programs.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
