const express = require('express');
const router = express.Router();
const { UserData } = require('../models');

/* GET users listing. */
router.get('/', (req, res) => {
  UserData
    .find()
    .then((userData) => {
      res.json({
        userData: userData.map(user => user.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
