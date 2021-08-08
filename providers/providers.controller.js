const express = require('express');
const router = express.Router();
const providerService = require('./provider.service');
const userService = require('../users/user.service');
// routes
router.post('/add', add);
router.get('/', getAll);
router.put('/put/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function add(req, res, next) {

    providerService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}

function getAll(req, res, next) {
    providerService.getAll()
        .then(providers => res.json(providers))
        .catch(err => next(err));
}



function update(req, res, next) {
    providerService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function _delete(req, res, next) {
    providerService.delete(req.params.id)
        .then(() => {
            userService.removeProviderFromUsers(req.params.id)
                .then(() => res.json({}))
        }
        )
        .catch(err => next(err));
}
