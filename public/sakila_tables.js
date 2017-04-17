const Sequelize = require('Sequelize');
const {sakila} = require('../config/database');
const tables = {
    actor: sakila.define('actor', {
        actor_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        last_update: Sequelize.STRING
    }, {
        timestamps: false,
        freezeTableName: true
    }),
    user_list: sakila.define('user_list', {
        USERID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true
        },
        USERNAME: Sequelize.STRING,
        PASSWORD: Sequelize.STRING,
    }, {
        timestamps: false,
        freezeTableName: true
    })
}
module.exports = tables;