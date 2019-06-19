'use strict'

// import connection database
const db = require('../database/db');

// import lodast isempty
const isEmpty = require('lodash.isempty');

exports.index = (req, res, next) => {
    let response = {
        status: 200,
        message: "welcome to simple note app"
    };
    res.json(response);
    res.end();
}