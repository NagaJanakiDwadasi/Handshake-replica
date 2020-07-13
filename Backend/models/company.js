const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Company = sequelize.define('company', {
        company_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        company_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email_id: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING
        },
        profile_picture: {
            type: Sequelize.BLOB
        }
    }
);
// Company.sync().then(() => {
//     console.log("NEw Table CREATE")
// }).catch(() => {
//     console.log("Table creation failed")
// });
module.exports = Company;