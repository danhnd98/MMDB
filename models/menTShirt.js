const mongoose = require('mongoose')

const menTShirtSchema = new mongoose.Schema({
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

const MenTShirt = new mongoose.model('MenTShirt', menTShirtSchema);

module.exports = MenTShirt;