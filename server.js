// * Create a basic server using Express.JS and heroku
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");


// start up express app to handle data parsing
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTML get requests
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));

  // app.get("/webCss", function (req, res) {
  //   res.sendFile(path.join(__dirname, "Develop/public/assets/css/styles.css"));
  // });
});

// starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening" + PORT);
  });