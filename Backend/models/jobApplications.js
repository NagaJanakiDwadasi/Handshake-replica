const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const JobApplications = sequelize.define('JobApplications', {
    job_application_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    job_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    company_id :{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    student_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    resume: {
        type: Sequelize.BLOB,
        allowNull: false
    },
    job_status: {
        type: Sequelize.STRING,
        allowNull: false
    }

}
);
module.exports = JobApplications;