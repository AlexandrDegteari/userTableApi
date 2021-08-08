const express = require('express');
const router = express.Router();
const db = require('_helpers/db');
const userService = require("./user.service");
const User = db.User;
// routes
router.get('/', getAll);
router.post('/add', add);
router.put('/put/:id', update);
router.get('/providers/:id', getProvidersByUserId);
router.delete('/:id', _delete);

module.exports = router;


function add(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    User.find().populate({
        path: 'providers'
    })
        .then(users => res.json(users))
        .catch(err => next(err));
}
function getProvidersByUserId(req, res, next) {
    userService.getProvidersByUserId(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}


function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
