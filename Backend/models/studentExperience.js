const Student = require('./student');
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const StudentExperienceDetails = sequelize.define('student_experience_details', {
        student_exp_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        company_name: {
            type: Sequelize.STRING
        }, 
        title: {
            type: Sequelize.STRING
        },
        location: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.DATE
        },
        end_date: {
            type: Sequelize.DATE
        },
        work_description: {
            type: Sequelize.STRING
        }
    }
);
// Student.sync().then(() => {
//     console.log("NEw Table CREATE")
// }).catch(() => {
//     console.log("Table creation failed")
// });
StudentExperienceDetails.belongsTo(Student, { foreignKey : 'student_id'});
module.exports = StudentExperienceDetails;
