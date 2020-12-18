const sequelize = require("./databaseManager").sequelize;
const User = require("./models/User").User;
const Food = require("./models/Food").Food;
const Group = require("./models/Group").Group;
const Products=require("./models/Products").Products;
const Category=require("./models/Category").Category;
const bodyParser= require('body-parser')

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
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.get('/create', async (req, res) =>{
  try {   
      await sequelize.sync({force : true})
      res.status(201).json({message: 'created'})

  }catch(err){
      console.warn(err)
      res.status(500).json ({message: 'server error'})

  }

})

app.get('/users', async(req, res)=>{
  try {
      const users=await User.findAll()
      res.status(200).json(users)
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.get('/users/:id', async(req, res)=>{
  try {
    const user= await User.findByPk(req.params.id)
    if(user){
      res.status(200).json(user)
    }else{
      res.status(404).json({message: 'user doesnt exist'})
    }
    res.status(200).json(users)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.post('/users', async(req, res)=>{
  try {
      //console.log(req.body)
      await User.create(req.body)
      res.status(201).json({message: 'user created'})
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.put('/users/:id',async (req, res)=>{
  try {
    const user= await User.findByPk(req.params.id)
    if(user){
      user.id=req.body.id
      user.firstName= req.body.firstName
      user.lastname=req.body.lastname
      user.email=req.body.email
      user.userType=req.body.userType
      await user.save()
      res.status(202).json({message: "accepted"})
    }else{
      res.status(404).json({message: 'user doesnt exist'})
    }
    res.status(200).json(users)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.delete('/users/:id',async(req, res)=>{
  try {
    const user= await User.findByPk(req.params.id)
    if(user){
      await user.destroy()
      res.status(202).json({message:'deleted'})
    }else{
      res.status(404).json({message: 'user doesnt exist'})
    }
    res.status(200).json(users)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.get('/categories', async(req, res)=>{
  try {
      const categories=await Category.findAll()
      res.status(200).json(categories)
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.get('/categories/:id', async(req, res)=>{
  try {
    const categories= await Category.findByPk(req.params.id)
    if(categories){
      res.status(200).json(categories)
    }else{
      res.status(404).json({message: 'category doesnt exist'})
    }
    res.status(200).json(categories)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})


app.post('/categories', async(req, res)=>{
  try {
      //console.log(req.body)
      await Category.create(req.body)
      res.status(201).json({message: 'category created'})
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.put('/categories/:id',async (req, res)=>{
  try {
    const categories= await Category.findByPk(req.params.id)
    if(categories){
      categories.id=req.body.id
      categories.name=req.body.name
      await categories.save()
      res.status(202).json({message: "accepted"})
    }else{
      res.status(404).json({message: 'category doesnt exist'})
    }
    res.status(200).json(categories)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.delete('/categories/:id',async(req, res)=>{
  try {
    const categories= await Category.findByPk(req.params.id)
    if(categories){
      await categories.destroy()
      res.status(202).json({message:'deleted'})
    }else{
      res.status(404).json({message: 'category doesnt exist'})
    }
    res.status(200).json(categories)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.get('/food', async(req, res)=>{
  try {
      const food=await Food.findAll()
      res.status(200).json(food)
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.get('/food/:id', async(req, res)=>{
  try {
    const food= await Food.findByPk(req.params.id)
    if(food){
      res.status(200).json(food)
    }else{
      res.status(404).json({message: 'food doesnt exist'})
    }
    res.status(200).json(food)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.post('/food', async(req, res)=>{
  try {
      //console.log(req.body)
      await Food.create(req.body)
      res.status(201).json({message: 'food created'})
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.put('/food/:id',async (req, res)=>{
  try {
    const food= await Food.findByPk(req.params.id)
    if(food){
      food.id=req.body.id
      food.name=req.body.name
      await food.save()
      res.status(202).json({message: "accepted"})
    }else{
      res.status(404).json({message: 'food doesnt exist'})
    }
    res.status(200).json(food)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.delete('/food/:id',async(req, res)=>{
  try {
    const food= await Food.findByPk(req.params.id)
    if(food){
      await food.destroy()
      res.status(202).json({message:'deleted'})
    }else{
      res.status(404).json({message: 'food doesnt exist'})
    }
    res.status(200).json(food)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

