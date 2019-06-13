const knex = require("../node_modules/knex");

const knexConfig = require("../knexfile");

module.exports = knex(knexConfig.development);
