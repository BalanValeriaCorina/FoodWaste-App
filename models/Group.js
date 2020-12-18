const sequelize = require("../databaseManager").sequelize;
const Sequelize=require('sequelize')

const Group=sequelize.define('group',{
    id:{type:Sequelize.DataTypes.INTEGER,primaryKey:true},
    name:Sequelize.DataTypes.STRING,
    numberOfMembers:Sequelize.DataTypes.INTEGER
},{timestamps:false});

module.exports={Group:Group}


