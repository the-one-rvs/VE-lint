const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

// Define path to the `output` folder
const OUTPUT_FOLDER = path.join(__dirname, "../outputs"); // change as per directory

// Endpoint to list all .txt files
app.get("/files", (req, res) => {
  fs.readdir(OUTPUT_FOLDER, (err, files) => {
    if (err) return res.status(500).send("Error reading folder");
    const txtFiles = files.filter(file => file.endsWith(".txt"));
    res.json(txtFiles);
  });
});

// Endpoint to fetch content of a specific file
app.get("/files/:filename", (req, res) => {
  const filePath = path.join(OUTPUT_FOLDER, req.params.filename);
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) return res.status(404).send("File not found");
    res.send(data);
  });
});


const PORT = 3030;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
