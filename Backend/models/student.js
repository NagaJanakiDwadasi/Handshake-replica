const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Student = sequelize.define('student', {
        student_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        student_name: {
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
        college_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        dob: {
            type: Sequelize.DATE
        },
        major: {
            type: Sequelize.STRING
        },
        skillset: {
            type: Sequelize.STRING
        },
        career_objectives: {
            type: Sequelize.STRING
        },
        college_location: {
            type: Sequelize.STRING
        },
        cgpa: {
            type: Sequelize.FLOAT
        },
        profile_picture: {
            type: Sequelize.BLOB
        }
    }
);
// Student.sync().then(() => {
//     console.log("NEw Table CREATE")
// }).catch(() => {
//     console.log("Table creation failed")
// });
module.exports = Student;