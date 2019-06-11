const knex = require('knex');
const server = require ('server')

const knexConfig = require('../knexfile.js');

module.exports = knex(knexConfig.development);
ß