const mongoose = require('mongoose')

const womenShirtSchema = new mongoose.Schema({
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

const WomenShirt = new mongoose.model('WomenShirt', womenShirtSchema);

module.exports = WomenShirt;