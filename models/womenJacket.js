const mongoose = require('mongoose')

const womenJacketSchema = new mongoose.Schema({
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

const WomenJacket = new mongoose.model('WomenJacket', womenJacketSchema);

module.exports = WomenJacket;