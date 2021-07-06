// BUILD YOUR SERVER HERE
const express = require('express');
const User = require('./users/model');

const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {

    const { name, bio } = req.body;

    if (!name || !bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    } else {
        User.insert({ name, bio })
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json({
                    message: "There was an error while saving the user to the database"
                })
            })
    }
})

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

server.delete('/api/users/:id', (req, res) => {
   
    const { id } = req.params;

    User.remove(id)
        .then(user => {
            if (!user) {
                res.status(404).json({
                    message: `user with id ${id} does not exist`
                })
            } else {
                res.json(user)
            }
        })
        .catch(err => {
            res.status(500).json({
                message: err.message,
            })
        })
})

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(422).json({
            message: 'name and bio are required'
        })
    } else {
        User.update(id, {name, bio})
            .then(updated => {
                if (!updated) {
                    res.status(404).json({
                        message: `user with id ${id} not found`
                    })
                } else {
                    res.json(updated)
                }
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message
                })
            })
    }
})

module.exports = server; // EXPORT YOUR SERVER instead of {}
