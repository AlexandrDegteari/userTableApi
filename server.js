require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('_helpers/error-handler');


const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "Clients Admin Panel API",
            version: '1.0.0',
        },
    },
    apis: ["server.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// api routes
app.use('/users', require('./users/users.controller'));

/**
 * @swagger
 * /users:
 *   get:
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success

 * /users/add:
 *   post:
 *     description: Add new user
 *     parameters:
 *      - name: username
 *        description: name of the client
 *        in: formData
 *        required: true
 *        type: string
 *      - name: phone
 *        description: phone of the client
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        description: email of the client
 *        in: formData
 *        required: true
 *        type: string
 *      - name: providers
 *        description: providers of the client
 *        in: formData
 *        required: false
 *        type: Array
 *     responses:
 *       201:
 *         description: Created
 *
 * /users/put/{id}:
 *   put:
 *     description: Edit user
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *      - name: username
 *        description: name of the client
 *        in: formData
 *        required: true
 *        type: string
 *      - name: phone
 *        description: phone of the client
 *        in: formData
 *        required: true
 *        type: string
 *      - name: email
 *        description: email of the client
 *        in: formData
 *        required: true
 *        type: string
 *      - name: providers
 *        description: providers of the client
 *        in: formData
 *        required: false
 *        type: Array
 *     responses:
 *       200:
 *         description: Success
 *
 * /users/providers/{id}:
 *   get:
 *     description: Get Providers by userID
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *
 *     responses:
 *       200:
 *         description: Success
 *
 *
 * /users/delete/{id}:
 *   delete:
 *     description: Delete user
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *
 *     responses:
 *       200:
 *         description: Success
 *
 *
 */
app.use('/providers', require('./providers/providers.controller'));
/**
 * @swagger
 * /providers:
 *   get:
 *     description: Get all providers
 *     responses:
 *       200:
 *         description: Success
 *
 *
 * /providers/add:
 *   post:
 *     description: Add new providers
 *     parameters:
 *      - name: name
 *        description: name of the client
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       201:
 *         description: Created
 *
 * /providers/put/{id}:
 *   put:
 *     description: Edit provider
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *      - name: name
 *        description: name of the provider
 *        in: formData
 *        required: true
 *        type: string
 *     responses:
 *       200:
 *         description: Success
 *
 * /providers/delete/{id}:
 *   delete:
 *     description: Delete provider
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Numeric ID of the user to retrieve.
 *
 *     responses:
 *       200:
 *         description: Success
 */
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3003;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
