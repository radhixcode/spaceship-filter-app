const async = require("async");
const _ = require("underscore");
const ships = require("../database/spaceships");

const minYear = 1980;
const maxYear = 2020;
const minSpeed = 50;
const maxSpeed = 200;

exports.getSpaceships = (req, res, next) => {
  async.waterfall(
    [
      (callback) => {
        const pulseLaser = req.query.laser && req.query.laser === "true" ? true : false;
        const year = req.query.date ? req.query.date.split(",") : [];
        const speed = req.query.speed ? req.query.speed.split(",") : [];
        const selectedColors = req.query.colors ? req.query.colors.split(",") : [];

        const filteredShips = _.filter(ships.spaceships, function (ship) {
          let checkYear = false;
          let checkSpeed = false;
          let checkColor = false;
          let checkPulseLaser = ship.laser === pulseLaser;

          // If any color selected get those, otherwise get all  ships
          if (selectedColors.length > 0) {
            checkColor = _.intersection(ship.color, selectedColors).length > 0;
          } else {
            checkColor = true;
          }

          // Conditional selection by year
          if (year.length === 2 && year[0] !== "" && year[1] !== "") {
            if (year[0] === "lt") checkYear = ship.year < parseInt(year[1]);
            if (year[0] === "gt") checkYear = ship.year > parseInt(year[1]);
            if (year[0] === "eq") checkYear = ship.year === parseInt(year[1]);
          } else {
            checkYear = true;
          }

          // Conditional selection by speed
          if (speed.length === 2 && speed[0] !== "" && speed[1] !== "") {
            if (speed[0] === "lt") checkSpeed = ship.speed < parseInt(speed[1]);
            if (speed[0] === "gt") checkSpeed = ship.speed > parseInt(speed[1]);
            if (speed[0] === "eq") checkSpeed = ship.speed === parseInt(speed[1]);
          } else {
            checkSpeed = true;
          }

          return checkPulseLaser && checkYear && checkSpeed && checkColor;
        });
        return callback(null, filteredShips);
      },
    ],
    (err, results) => {
      if (err) {
        next(err);
      } else {
        res.json({
          success: true,
          message: results,
        });
      }
    }
  );
};
