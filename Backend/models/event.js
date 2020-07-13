const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Event = sequelize.define('event', {
    event_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    event_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    event_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    event_starttime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    event_endtime: {
        type: Sequelize.TIME,
        allowNull: false
    },
    event_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    event_location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    event_eligibility: {
        type: Sequelize.STRING
    }

}
);
module.exports = Event;