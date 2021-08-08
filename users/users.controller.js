const express = require('express');
const router = express.Router();
const db = require('_helpers/db');
const userService = require("./user.service");
const User = db.User;
// routes
router.get('/', getAll);
router.post('/add', add);
router.put('/addto', addProviderToUser);
router.put('/removefrom', removeProviderFromUser);
router.put('/put/:id', update);
router.get('/providers/:id', getProvidersByUserId);
router.delete('/:id', _delete);

module.exports = router;

function addProviderToUser(req, res, next) {
    userService.addProviderToUser(req.body.userId,req.body.providerId)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function removeProviderFromUser(req, res, next) {
    userService.removeProviderFromUser(req.body.userId,req.body.providerId)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function add(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    const sort = {};
    if (req.query.sortBy) {
        const str = req.query.sortBy.split(':');
        sort[str[0]] = str[1] === 'desc' ? -1 : 1
    }
    User.find().populate({
        path: 'providers',
        options: {
            sort
        }
    })
        .skip(parseInt(req.query.skip)) // Always apply 'skip' before 'limit'
        .limit(parseInt(req.query.limit))
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
