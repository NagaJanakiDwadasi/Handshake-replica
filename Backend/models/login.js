const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Login = sequelize.define('login', {
        email_id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        profile: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);
module.exports = Login;