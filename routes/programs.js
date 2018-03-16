const express = require('express');
const router = express.Router();
const { ProgramData } = require('../models');

/* GET programs listing. */
router.get('/', (req, res) => {
  ProgramData
    .find()
    .then((programData) => {
      res.status(200).json({
        programData: programData.map(program => program.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
