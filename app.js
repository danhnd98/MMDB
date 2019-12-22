const express = require('express')
require('./db/mongoose')
const app = express()
const mainRouter = require('./router/mainRouter')
const updateDBRouter = require('./router/updateDBRouter')
const base64Img = require('base64-img');
var cors = require('cors')
const fs = require('fs')

app.use(cors())
app.use(express.json({limit: '50mb'}));

const port = process.env.PORT || 3002

//Router
app.use(mainRouter)
app.use(updateDBRouter)

var Algorithmia = require("algorithmia");
// var data = base64Img.base64Sync('./image/81037710_436878047200025_6872824955029946368_n.png');
// fs.writeFile('base64', data, () => {});

// console.log(data)
// base64Img.imgSync(image, "./","test.jpg", ()=>{
//     console.log("Done")
//   })

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})