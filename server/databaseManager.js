const Sequelize = require("sequelize"); //import the sequelize dependency
require("dotenv").config();

const sequelize = new Sequelize(
  "FoodWaste_db",

  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,

  {
    //create the connection to our database
    host: "localhost",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    //checking if the connection was successful
    console.log("connected");
  })
  .catch((err) => {
    console.warn(err);
  });

module.exports = { sequelize: sequelize }; //this is the object that makes the connection to our database
