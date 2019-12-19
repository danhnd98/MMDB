const mongoose = require('mongoose')
const MONGODB_URL = "mongodb://ntt261298:hust123456@ds141198.mlab.com:41198/tiki-clothes?retryWrites=false"
// console.log(process.env)
mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})

mongoose.connection.on('open', function (ref) {
    console.log('Connected to mongo server.');
    //trying to get collection names
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        // console.log(names); // [{ name: 'dbname.myCollection' }]
        // module.exports.Collection = names;
    });
})