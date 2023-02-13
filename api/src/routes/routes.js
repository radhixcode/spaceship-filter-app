const express = require("express");
const spaceshipController = require("../controllers/spaceshipController");
const router = express.Router();

// GET home page.
router.get("/", (req, res, next) => {
  res.send("Welcome to your space ship browser");
});

// GET request for list spaceships (start with '/spacehip').
router.use("/spaceships", spaceshipController.getSpaceships);

// Invalid GET requests.
router.get("*", (req, res, next) => {
  res.send("Page not found");
});

module.exports = router;
