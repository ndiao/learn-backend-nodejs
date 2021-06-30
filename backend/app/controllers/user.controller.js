exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    
    res.status(200).send("Espace des utilisateurs.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Espace des administrateurs.");
};

exports.professorBoard = (req, res) => {
    res.status(200).send("Espace des professeurs.");
};

exports.studentBoard = (req, res) => {
    res.status(200).send("Espace des etudiants.");
};