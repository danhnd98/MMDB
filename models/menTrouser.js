const mongoose = require('mongoose')

const menTrouserSchema = new mongoose.Schema({
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

const MenTrouser = new mongoose.model('Men-Trousers', menTrouserSchema);

module.exports = MenTrouser;