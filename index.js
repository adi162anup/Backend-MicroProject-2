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

app.listen(process.env.SERVER_PORT,(req,res) => {
    mongoose.connect(process.env.MONGODB_URL,{})
    .then(() => console.log(`Server running on port ${process.env.SERVER_PORT}`))
    .catch((err) => console.log(err))
})


