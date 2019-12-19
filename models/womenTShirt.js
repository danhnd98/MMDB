const mongoose = require('mongoose')

const womenTShirtSchema = new mongoose.Schema({
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
    }
})

const WomenTShirt = new mongoose.model('WomenTShirt', womenTShirtSchema);

module.exports = WomenTShirt;