/**
 * auth：Chris.Chien
 * describe：连接数据库
 */
const Sequelize = require('sequelize');
//new Sequelize('database', 'username', 'password',{});
const sakila = new Sequelize('sakila', 'root', '123456', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = { sakila };