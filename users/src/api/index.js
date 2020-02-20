const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controller');
const handlers = require('./handlers');
const USER = 'user';

const app = express();

function setHandlers() {
    handlers[USER].forEach(handler => {
        app[handler](`/${USER}`, (req, res) => {
            
        })
    });
}

const start = ({ host, port }) => {
    app.use(bodyParser.json());
}

module.exports = start;
