const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const EventRegistrations = sequelize.define('event_registrations', {

    event_application_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    event_id: {
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
    }

}
);
module.exports = EventRegistrations;