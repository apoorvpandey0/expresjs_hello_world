const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Users list')
})

router.post('/create', (req, res) => {
    res.send('User created')
})

// Method 1 for chaining HTTP methods in a single route
router.route('/:id').get((req, res) => {
    res.send(`User with id ${req.params.id}`)
}).put((req, res) => {
    res.send(`User with id ${req.params.id} updated`)
}).delete((req, res) => {
    res.send(`User with id ${req.params.id} deleted`)
}).post((req, res) => {
    res.send(`User with id ${req.params.id} created`)
})

// Method 2 for chaining HTTP methods in multiple routes
/*
router.get('/:id', (req, res) => {
    res.send('User with id: ' + req.params.id)
})

router.post('/:id', (req, res) => {
    res.send('User with id: ' + req.params.id + ' created')
})

router.put('/:id', (req, res) => {
    res.send('User with id: ' + req.params.id + ' updated')
})

router.delete('/:id', (req, res) => {
    res.send('User with id: ' + req.params.id + ' deleted')
})

*/

const users = [{ name: 'Peter', age: 31 }, { name: 'John', age: 32 }]

// this works as kind of a middle ware between request and router function
router.param('id', (req, res, next, id) => {
    console.log(`ID: ${id}`)

    // now req everywhere will have a user object to use
    req.user = users[id]
    next()
})

module.exports = router;