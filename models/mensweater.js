const mongoose = require('mongoose')

const menSweaterSchema = new mongoose.Schema({
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
    boundingbox : {
        type : mongoose.Schema.Types.Mixed
    }
})

const MenSweater = new mongoose.model('Men-Sweaters', menSweaterSchema);

module.exports = MenSweater;