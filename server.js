const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4 } = require("uuid");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, notes) => {
    if (err) res.status(500).json(err);
    res.json(JSON.parse(notes));
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: v4(),
  };
  fs.readFile("db/db.json", "utf8", (err, notes) => {
    if (err) res.status(500).json(err);
    const notesArray = JSON.parse(notes);
    notesArray.push(newNote);
    console.log(notesArray);
    fs.writeFile("db/db.json", JSON.stringify(notesArray), (err, notes) => {
      if (err) res.status(500).json(err);
      res.json(notesArray);
    });
  });
});

app.delete("/api/notes/:id", (req, res) => {
  fs.readFile("db/db.json", "utf8", (err, notes) => {
    if (err) res.status(500).json(err);
    const allNotes = JSON.parse(notes);
    const filteredNotes = allNotes.filter((note) => note.id !== req.params.id);
    console.log(allNotes, filteredNotes);
    fs.writeFile("db/db.json", JSON.stringify(filteredNotes), (err, notes) => {
      if (err) res.status(500).json(err);
      res.json(filteredNotes);
    });
  });
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
