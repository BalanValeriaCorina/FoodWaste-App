const Food = require("./Food").Food;
const sequelize = require("../databaseManager").sequelize;
const Sequelize = require("sequelize");

const Category = sequelize.define(
  "category",
  {
    name: Sequelize.DataTypes.STRING,
  },
  { timestamps: false }
);

Category.hasMany(Food, { foreignKey: "categoryId" });
Food.belongsTo(Category, { foreignKey: "categoryId" });
module.exports = { Category: Category };
