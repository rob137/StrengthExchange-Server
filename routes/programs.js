const express = require('express');
const router = express.Router();
const { UserData, ProgramData } = require('../models');

/* GET programs listing. */
router.get('/', (req, res) => {
  UserData
    .find()
    .then((userData) => {
      res.status(200).json({
        programData: userData.map(user => user.programs.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
