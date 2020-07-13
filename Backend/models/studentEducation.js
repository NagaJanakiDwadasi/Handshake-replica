const Student = require('./student');
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const StudentEducationDetails = sequelize.define('student_education_details', {
        student_edu_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        degree: {
            type: Sequelize.STRING,
            allowNull: false
        },
        college_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        location: {
            type: Sequelize.STRING,
        },
        major: {
            type: Sequelize.STRING
        },
        year_of_passing: {
            type: Sequelize.STRING
        },
        cgpa: {
            type: Sequelize.FLOAT
        }
    }
);

StudentEducationDetails.belongsTo(Student,{ foreignKey : 'student_id'});
module.exports = StudentEducationDetails;
