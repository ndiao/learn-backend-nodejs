const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "ADMIN") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Role admin requis!"
      });
      return;
    });
  });
};

isProfessor = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "PROFESSEUR") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Role professeur requis!"
      });
    });
  });
};

isProfessorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "PROFESSEUR") {
          next();
          return;
        }

        if (roles[i].name === "ADMIN") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Role admin ou professeur requis!"
      });
    });
  });
};

isStudent = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === "ETUDIANT") {
            next();
            return;
          }
        }
  
        res.status(403).send({
          message: "Role etudiant requis!"
        });
      });
    });
  };

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isProfessor: isProfessor,
  isProfessorOrAdmin: isProfessorOrAdmin,
  isStudent: isStudent
};
module.exports = authJwt;