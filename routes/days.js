const express = require('express');
const router = express.Router();
const { Days } = require('../models');

/* GET days listing. */
router.get('/', (req, res) => {
  Days
    .find()
    .then((days) => {
      res.status(200).json({
        days: days.map(day => day.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/* GET all days associated with user id. */
router.get('/program/:programId', (req, res) => {
  Days
    .find({ programId: req.params.programId })
    .then((days) => {
      res.status(200).json({ days });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
