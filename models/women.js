const mongoose = require('mongoose')

const womenSchema = new mongoose.Schema({
    image : {
        type : String,
        required : false
    },
    price_regular : {
        type: String
    },
    link : {
        type : String
    },
    final_price : {
        type : String
    },
    title : {
        type : String
    },
    category : {
        type : String
    }
})

const Women = new mongoose.model('Women', womenSchema);

module.exports = Women;