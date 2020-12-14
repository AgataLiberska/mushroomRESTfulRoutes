const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const path = require('path')
const Mushroom = require('./models/mushroom')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


mongoose.connect('mongodb://localhost:27017/myMushrooms', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
.then(() =>{
    console.log("DB Connection open")
})
.catch(err => {
    console.log("DB Connection error")
    console.log(err)
})

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/mushrooms', async (req, res) => {
    const mushrooms = await Mushroom.find({})
    res.render('mushrooms/index', { mushrooms })
})

app.listen(3000, () => {
    console.log('Connected to server!')
})