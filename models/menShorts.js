const mongoose = require('mongoose')

const menShortsSchema = new mongoose.Schema({
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

const MenShorts = new mongoose.model('MenShorts', menShortsSchema);

module.exports = MenShorts;