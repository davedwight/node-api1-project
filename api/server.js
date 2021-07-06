// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.get('/api/users', (req, res) => {
    // res.status(200).json({ message: 'fetching all users'})
    User.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
            })
        })
})

server.get('/api/users/:id', (req, res) => {
    // res.status(200).json({ message: 'fetching all users'})
    
    const { id } = req.params;

    User.findById(id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: `user with id ${id} does not exist`
                })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
            })
        })
})

server.post('/api/users', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.bio);
})

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `deleting user with id ${id}`})
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.status(201).json({ message: `updating user with id: ${id}`})
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
