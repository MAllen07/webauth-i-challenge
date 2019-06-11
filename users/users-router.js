const express = require("express");

const Users = require("../users/users-model");
const restricted = require("../auth/restricted.js");

const router = express.Router();

router.get("/", restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send({ message: "You shall not pass!" }));
});

module.exports = router;
