const express = require("express");
const router = express.Router();

// If we want to use a middle ware with a specific router we can use:
// router.use(logger)

router.get('/', (req, res) => {

    // How to access query parameters in express
    console.log(req.query.search);

    res.send(users)
})

router.post('/create', (req, res) => {
    // By default express does not allows us to access form data
    // we need to enable urlencoded middleware to access the data in our fns

    const isValid = true;

    if (isValid) {
        users.push(req.body)
        res.redirect('/users')
    } else {
        res.status(400).send("Invalid data")
    }
    console.log(req.body);
    res.send('User created')
})

router.get('/new', (req, res) => {
    res.render('users/new', { 'fname': 'Apoorv', 'lname': 'Pandey' })
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

const users = [{ fname: 'Peter', lname: 'Gryffin' }, { fname: 'Stweie', lname: 'Gryffin' }]

// this works as kind of a middle ware between request and router function
router.param('id', (req, res, next, id) => {
    console.log(`ID: ${id}`)

    // now req everywhere will have a user object to use
    req.user = users[id]
    next()
})

module.exports = router;