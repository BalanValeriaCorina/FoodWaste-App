/**
 * defining the Food model for database manipulation
 * defining the relationship between the User and the Food entity
 * @see User.js
 */

const User = require("./User").User;
const sequelize = require("../databaseManager").sequelize;
const Sequelize=require('sequelize')


const Food=sequelize.define('food',{
    id:{type:Sequelize.DataTypes.INTEGER,primaryKey:true},
    name:Sequelize.DataTypes.STRING
},{timestamps:false});


//defining the many to many relationship betweeen the User and the Food entities 
module.exports={Food:Food};



