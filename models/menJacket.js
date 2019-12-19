const mongoose = require('mongoose')

const menJacketSchema = new mongoose.Schema({
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
    boundingbox : {
        type : mongoose.Schema.Types.Mixed
    }
})

const MenJacket = mongoose.model('MenJacket', menJacketSchema);

module.exports = MenJacket;