const Student = require('./student');
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const StudentAddress = sequelize.define('student_address', {
        student_address_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        city : {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        }
    }
);
// Student.sync().then(() => {
//     console.log("NEw Table CREATE")
// }).catch(() => {
//     console.log("Table creation failed")
// });
StudentAddress.belongsTo(Student,{ foreignKey : 'student_id'});
module.exports = StudentAddress;
