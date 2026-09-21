const express = require("express");
const { lecons, exercices } = require("../data/apprentissage");

const router = express.Router();

router.get("/apprendre", (req, res) => {
  res.json(lecons);
});

router.get("/exercices", (req, res) => {
  res.json(exercices);
});

module.exports = router;
