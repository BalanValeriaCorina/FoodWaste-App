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






app.get('/groups', async(req, res)=>{
  try {
      const groups=await Group.findAll()
      res.status(200).json(groups)
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.get('/groups/:id', async(req, res)=>{
  try {
    const Group= await Group.findByPk(req.params.id)
    if(Group){
      res.status(200).json(Group)
    }else{
      res.status(404).json({message: 'group doesnt exist'})
    }
    res.status(200).json(groups)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.post('/groups', async(req, res)=>{
  try {
      //console.log(req.body)
      await groups.create(req.body)
      res.status(201).json({message: 'group created'})
  } catch (err) {
      console.warn(err)
      res.status(500).json({message: 'server error'})
  }
})

app.put('/groups/:id',async (req, res)=>{
  try {
    const group= await Group.findByPk(req.params.id)
    if(Group){
      Group.id=req.body.id
      Group.name= req.body.name
      Group.numberOfMembers=req.body.numberOfMembers
      await Group.save()
      res.status(202).json({message: "accepted"})
    }else{
      res.status(404).json({message: 'group doesnt exist'})
    }
    res.status(200).json(groups)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})

app.delete('/groups/:id',async(req, res)=>{
  try {
    const group= await group.findByPk(req.params.id)
    if(group){
      await group.destroy()
      res.status(202).json({message:'deleted'})
    }else{
      res.status(404).json({message: 'group doesnt exist'})
    }
    res.status(200).json(group)
} catch (err) {
    console.warn(err)
    res.status(500).json({message: 'server error'})
}
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

