const mongoose = require('mongoose')

const menShirtSchema = new mongoose.Schema({
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

const MenShirt = new mongoose.model('MenShirt', menShirtSchema);

module.exports = MenShirt;