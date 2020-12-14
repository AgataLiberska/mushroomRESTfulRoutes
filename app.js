const express = require('express')
const app = express()
const mongoose  = require('mongoose')


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
    res.send('This is home page')
})

app.listen(3000, () => {
    console.log('Connected to server!')
})