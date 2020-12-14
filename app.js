const express = require('express')
const app = express()
const mongoose  = require('mongoose')
const path = require('path')
const Mushroom = require('./models/mushroom')
const methodOverride = require('method-override')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))


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

app.get('/mushrooms/new', (req,res) => {
    res.render('mushrooms/new')
})

app.post('/mushrooms', async (req, res) => {
    const mushroom = new Mushroom(req.body.mushroom)
    await mushroom.save()
    res.redirect(`/mushrooms/${mushroom._id}`)
}) 

app.get('/mushrooms/:id', async (req, res) => {
    const mushroom = await Mushroom.findById(req.params.id)
    res.render('mushrooms/show', { mushroom })
})

app.get('/mushrooms/:id/edit', async (req,res) => {
    const mushroom = await Mushroom.findById(req.params.id)
    res.render('mushrooms/edit', { mushroom }) 
})

app.put('/mushrooms/:id', async (req, res) => {
    const mushroom = await Mushroom.findByIdAndUpdate(req.params.id, {...req.body.mushroom}, {runValidators: true, new: true})
    res.redirect(`/mushrooms/${mushroom._id}`)
})

app.delete('/mushrooms/:id', async (req, res) => {
    await Mushroom.findByIdAndDelete(req.params.id)
    res.redirect('/mushrooms')
})

app.listen(3000, () => {
    console.log('Connected to server!')
})