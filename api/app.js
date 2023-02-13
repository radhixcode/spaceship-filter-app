const PORT = process.env.PORT || 3001;
const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./src/routes/routes");
const app = express();

const errorHandler = (error, request, response, next) => {
  const errStatus = error.statusCode || 500;
  const errMsg = error.message || "Something went wrong";
  console.log(error)
  response.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg
  });
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

// Body parser for request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/", routes);

// Error handling
app.use(errorHandler)

// Start the server
app.listen(PORT, () => {
  console.log(`Visit localhost:${PORT} in your browser`);
});
