const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Job = sequelize.define('job', {
    job_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    posting_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    deadline: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    salary: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    job_type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company_id :{
        type: Sequelize.INTEGER,
        allowNull: false
    }



}
);
module.exports = Job;