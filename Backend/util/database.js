const Sequelize = require('sequelize')

 const sequelize = new Sequelize('handshake', 'admin', 'handshake', {
     dialect: 'mysql',
     dialectOptions: {
         ssl:''
     },
     host: '',
     port: '',
     pool: {
         max: 5,
         min: 0,
         acquire: ,
         idle: 
     }
 });

module.exports = sequelize;