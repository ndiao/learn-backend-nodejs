const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// Parser les requetes HTTP du content-type - application/json
app.use(express.json());

// Parser les requetes HTTP du content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur NodeJS" });
});

// Mettre le port d'écoute 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur demarre sur le port: ${PORT}.`);
});