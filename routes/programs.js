const express = require('express');
const router = express.Router();
const { Users, Programs } = require('../models');

/* GET programs. */
router.get('/', (req, res) => {
  Programs
    .find()
    .then((programs) => {
      res.status(200).json({
        programs: programs.map(program => program.serialize()),
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/* GET by program id. */
router.get('/:programId', (req, res) => {
  Programs
    .find()
    .then((programs) => {
      const program = programs.filter(prog => prog.id === req.params.programId);
      if (program.length === 0) {
        res.status(404).json({ 
          message: 'Program not found - check the id is correct.',
        });
      }
      res.status(200).json({ program });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

/* GET all programs associated with user id. */
router.get('/user/:userId', (req, res) => {
  Programs
    .find({ userId: req.params.userId })
    .then((programs) => {
      res.status(200).json({ programs });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;
