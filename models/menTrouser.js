const mongoose = require('mongoose')

const menTrouserSchema = new mongoose.Schema({
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

const MenTrouser = new mongoose.model('MenTrouser', menTrouserSchema);

module.exports = MenTrouser;