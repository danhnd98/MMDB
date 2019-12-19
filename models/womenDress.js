const mongoose = require('mongoose')

const womenDressSchema = new mongoose.Schema({
    images : {
        type : mongoose.Schema.Types.Mixed
    },
    price_regular : {
        type: String
    },
    image_urls : {
        type : mongoose.Schema.Types.Mixed
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
    color : {
        type : mongoose.Schema.Types.Mixed
    },
    boundingbox : {
        type : mongoose.Schema.Types.Mixed
    }
})

const WomenDress = new mongoose.model('Women-Dress', womenDressSchema);

module.exports = WomenDress;