const mongoose = require('mongoose')

const menSchema = new mongoose.Schema({
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

const Men = new mongoose.model('Men', menSchema);

module.exports = Men;