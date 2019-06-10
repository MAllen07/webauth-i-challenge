const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const db = require('./database/dbConfig.js');
const Users = require('./users/users-model.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send("It's alive!");
});
// POST - API REGISTER - HASH THE PASSWORD
server.post('/api/register', (req, res) => {
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
// POST API - LOGIN 
server.post('/api/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user) {
                res.status(200).json({ message: `Logged in ${user.username}!` });
            } else {
                res.status(401).json({ message: 'You shall not pass!' });
            }
        })
        .catch(error => {
            res.status(500).json(error);
        });
    
});
//GET API-USERS
server.get('/api/users', (req, res) => {
    Users.find()
        .then(users => {
            res.json(users);
        })
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`\n** Running on port ${port} **\n`));
