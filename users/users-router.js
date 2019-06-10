server.get("/", (req, res) => {
  res.send("It's alive!");
});

//POST REGISTER W/ Hash
server.post("/api/register", (req, res) => {
  let user = req.body;

  //hash the password
  const hash = bcrypt.hashSync(user.password, 8); //password gets re-hashed 2 ^8 times
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//POST LOGIN
server.post("/api/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "You shall not pass!" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//GET - USERS

server.get("/api/users", (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => res.send({ message: "You shall not pass!"}));
});
