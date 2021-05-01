// * Create a basic server using Express.JS and heroku
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");

let notes = require("./db.json");

// starts the server to begin listening
app.listen(PORT, function () {
  console.log("App listening" + PORT);
});

// start up express app to handle data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname, "/public"));

// HTML get requests
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req,res){
  res.sendFile(notes);
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/api/notes", (req,res) => {
  const newNote = req.body;
  notes.push(newNote);
  fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), (err) => {
    if (err) {
      throw err;
    }
    res.json(notes);
  });
});