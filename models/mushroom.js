const mongoose = require('mongoose')

const mushroomSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    location: String,
    dateFound: {
        type: Date,
        default: Date.now
    },
    edible: Boolean
})

const Mushroom = mongoose.model('Mushroom', mushroomSchema);

module.exports = Mushroom;