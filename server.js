const sequelize = require("./databaseManager").sequelize;
const User = require("./models/User").User;
const Food = require("./models/Food").Food;
const Group = require("./models/Group").Group;
const Products=require("./models/Products").Products;
const Category=require("./models/Category").Category;

//defining the mane to many relationship betweeen the User and the Food entities 
User.belongsToMany(Food, { through: 'FoodPreferences',timestamps:false });
Food.belongsToMany(User, { through: 'FoodPreferences',timestamps:false });
User.belongsToMany(User, { as: 'friend', through: 'Friends',timestamps:false });
Group.belongsToMany(User,{through:'UserGroups',timestamps:false});
User.belongsToMany(Group,{through:'UserGroups',timestamps:false});
User.belongsToMany(Food, { through: 'Allergies',timestamps:false });
Food.belongsToMany(User, { through: 'Allergies',timestamps:false });

sequelize.sync({force:false}).then(()=>
{
    console.log('tables created')
})


const express = require('express')

const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

