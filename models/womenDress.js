const mongoose = require('mongoose')

const womenDressSchema = new mongoose.Schema({
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

const WomenDress = new mongoose.model('WomenDress', womenDressSchema);

module.exports = WomenDress;