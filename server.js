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
 * tags:
 *  name: users
 *  description: This is clients endpoint
 * /users:
 *   get:
 *     tags: [users]
 *     description: Get all users
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found

 * /users/add:
 *   post:
 *     tags: [users]
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
 *       404:
 *         description: Bad request
 *
 * /users/put/{id}:
 *   put:
 *     tags: [users]
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
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad request
 *
 * /users/providers/{id}:
 *   get:
 *     tags: [users]
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
 *       404:
 *         description: Not Found
 *
 *
 * /users/delete/{id}:
 *   delete:
 *     tags: [users]
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
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad request
 *
 *
 */
app.use('/providers', require('./providers/providers.controller'));
/**
 * @swagger
 * /providers:
 *   get:
 *     tags: [providers]
 *     description: Get all providers
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *
 *
 * /providers/add:
 *   post:
 *     tags: [providers]
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
 *       400:
 *         description: Bad request
 *
 * /providers/put/{id}:
 *   put:
 *     tags: [providers]
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
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad request
 *
 * /providers/delete/{id}:
 *   delete:
 *     tags: [providers]
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
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not Found
 */
// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3003;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
