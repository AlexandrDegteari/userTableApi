const path = require('path');
const multer = require('multer');
const express = require('express');
const router = express.Router();
const userService = require('./user.service');
const db = require('_helpers/db');
const User = db.User;
// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/length', getLength);
router.get('/current', getCurrent);
router.get('/get/:id', getById);
router.put('/name', getByName);
router.put('/put/:id', update);
router.put('/sendemail', sendEmail);
router.delete('/:id', _delete);

module.exports = router;

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

function getLength(req, res, next) {
    userService.getAll()
        .then(length => res.json(length.length))
        .catch(err => next(err));
}

// Init Upload
const upload = multer({
    storage: storage,
    limits: {fileSize: 1000000},
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
}).single('file');

// Check File Type
function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

router.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.json({
                msg: req.body,
            });
        } else {
            res.json(`https://api.qmenu.me/uploads/${req.file.filename}`);
        }
    })
});


function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'}))
        .catch(err => next(err));
}

function register(req, res, next) {

    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));

}

function getAll(req, res, next) {
    const match = {};
    const sort = {};
    if (req.query.sortBy) {
        const str = req.query.sortBy.split(':');
        sort[str[0]] = str[1] === 'desc' ? -1 : 1
    }
    User.find()
        .skip(parseInt(req.query.skip)) // Always apply 'skip' before 'limit'
        .limit(parseInt(req.query.limit))
        .then(users => res.json(users))
        .catch(err => next(err));
}


function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getByName(req, res, next) {
    userService.getByName(req.body)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function sendEmail(req, res, next) {
    userService.sendEmail(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
