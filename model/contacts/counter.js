const mongoose = require('mongoose')

const Counter = mongoose.Schema({
    name: {
        type:String,
        require: true
    },
    count: {
        type: Number
    }
})


module.exports = mongoose.model('counter', Counter)