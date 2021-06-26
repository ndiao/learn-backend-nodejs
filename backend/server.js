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

// database
const db = require("./app/models");
const Role = db.role;

// En production db.sequelize.sync();
// Supprimer les tables et recharge les données
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur NodeJS" });
});

// routes
/*require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);*/

// Mettre le port d'écoute 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur demarre sur le port: ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "USER"
  });
 
  Role.create({
    id: 2,
    name: "ETUDIANT"
  });
 
  Role.create({
    id: 3,
    name: "PROFESSEUR"
  });

  Role.create({
    id: 4,
    name: "ADMIN"
  });
}