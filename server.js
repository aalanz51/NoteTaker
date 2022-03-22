const express = require("express");
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get('/api/notes', (req, res) => {
    
    fs.readFile('db/db.json', 'utf8', (err, notes) => {
        if (err) res.status(500).json(err);
        res.json(JSON.parse(notes))
    });
  });



  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
  });
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });
  
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
