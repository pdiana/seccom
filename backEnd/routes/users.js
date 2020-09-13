const express = require('express');
const router = express.Router();
const validation = require('../helpers/validation');
const fakeDb = require('../helpers/dummyDb');

// CORS ENABLED FOR TESTING PURPOSES


// GET ALL
router.get('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.send(fakeDb);
});

// GET BY ID
router.get('/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const user = fakeDb.find(user => user.id === parseInt(req.params.id));

    //check if user id exists & return user
    if (!user) return res.status(404).send('ID does not match any user in database');
    res.send(user);
});

//POST
router.post('/', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //input validation
    const {error} = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //create & return new user
    const user = {
        id: fakeDb.length + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    };
    fakeDb.push(user);
    res.send(user);
});

// PUT
router.put('/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const user = fakeDb.find(user => user.id === parseInt(req.params.id));
    //check if user id exists & input validation
    if (!user) return res.status(404).send('ID does not match any user in database');
    const {error} = validation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //user update & return updated user
    Object.assign(user, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email
    });
    res.send(user);
});

// DELETE
router.delete('/:id', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const user = fakeDb.find(user => user.id === parseInt(req.params.id));
    //check if user id exists & delete user
    if (!user) return res.status(404).send('ID does not match any user in database');
    const index = fakeDb.indexOf(user);
    fakeDb.splice(index, 1);
    res.send(user);
});

module.exports = router;