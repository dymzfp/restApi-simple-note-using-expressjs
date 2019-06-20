'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = require('../config');
// const env = env_file.NODE_ENV || 'development';


const config = require(__dirname + '/../config/config.json')['config'];
const db = {};

let sequelize;

const database = env.DB_NAME || config.database;
const user = env.DB_USER || config.username;
const pass = env.DB_PASS || config.password;
const host = env.DB_HOST || config.host;
const dialect = env.DB_DIALECT || config.dialect;

sequelize = new Sequelize(database, user, pass, {
  host: host,
  dialect: dialect,
  operatorsAliases: false,
  dateStrings: true
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
