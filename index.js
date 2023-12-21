const express = require('express');
const bodyParser = require('body-parser');
const { mongo, default: mongoose } = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static('./public'))

// creating recipe schema
const Recipe = mongoose.model('Recipe',{
    recipeName: String,
    recipeTime: String,
    ingredients: Array,
    serves: String
})

app.get('/',(req,res) => {
    res.json({message: 'All good'})
})

// Create method
app.post('/recipes',(req,res) => {
    const {recipeName, recipeTime, ingredients, serves} = req.body
    const recipe = new Recipe({
        recipeName: recipeName,
        recipeTime: recipeTime,
        ingredients: ingredients,
        serves: serves
    })
    recipe.save().then((recipe) => {
        res.json({message: 'Recipe added successfully'})
    }).catch((err) => {
        res.json({err: 'An error occured'})
    })
})

app.listen(process.env.SERVER_PORT,(req,res) => {
    mongoose.connect(process.env.MONGODB_URL,{})
    .then(() => console.log(`Server running on port ${process.env.SERVER_PORT}`))
    .catch((err) => console.log(err))
})


