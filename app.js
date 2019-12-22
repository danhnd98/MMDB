const express = require('express')
require('./db/mongoose')
const app = express()
const mainRouter = require('./router/mainRouter')
const updateDBRouter = require('./router/updateDBRouter')
const base64Img = require('base64-img');
var cors = require('cors')

app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

//Router
app.use(mainRouter)
app.use(updateDBRouter)

var Algorithmia = require("algorithmia");
var data = base64Img.base64Sync('./image/trungml.jpg');
// console.log(data)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})