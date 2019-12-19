const mongoose = require('mongoose')

const menJacketSchema = new mongoose.Schema({
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

const MenJacket = mongoose.model('Men-Jacket', menJacketSchema);

module.exports = MenJacket;