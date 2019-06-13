const express = require("express");

const Users = require("../users/users-model");
const protect = require("../auth/protect");

const router = express.Router();

router.get("/", protect, (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send({ message: "You shall not pass!" }));
});

module.exports = router;
