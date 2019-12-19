const express = require('express')
const MenJacket = require('../models/menJacket')
const MenShirt = require('../models/menShirt')
const MenShorts = require('../models/menShorts')
const MenTrouser = require('../models/menTrouser')
const MenTShirt = require('../models/menTShirt')
const Men = require('../models/men')
const WomenJacket = require('../models/womenJacket')
const WomenDress = require('../models/womenDress')
const WomenShirt = require('../models/womenShirt')
const WomenIShirt = require('../models/womenTShirt')
const Women = require('../models/women')
const multer = require('multer')
const sharp = require('sharp')
var fs = require('fs');
var Algorithmia = require("algorithmia");
// var data = base64Img.base64Sync('./image/trungml.jpg');

const router = new express.Router();

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }

        cb(undefined, true)
    }
})

router.post('/search', upload.single('image'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).png().toBuffer()
    let now = Date.now().toString()+".png";
    fs.appendFile('./image/' + now, "", function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
    console.log(now)
    let wrStream = fs.createWriteStream('./image/' + now);
    wrStream.write(buffer);

    res.send("ok")
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.get("/createboundingbox", async(req, res) => {
    let cate = req.query.Category;
    console.log("Run");
    try {
        
    
    let menJacket = await MenJacket.find();
    console.log("load done!")
    console.log(menJacket)
    menJacket.forEach(async item =>  {
        
        if(!item.boundingbox){
            var input = {  
                "image": item.image,
                "model":"mid",
                "threshold" : 0.3,
                "tags_only": true
             };
             Algorithmia.client("simM2gZzOb1UxCiXEs1ZRJK+uFy1")
               .algo("algorithmiahq/DeepFashion/1.3.0?timeout=3000") // timeout is optional
               .pipe(input)
               .then(async function(response) {
                let data  = response.get();
                console.log(data)
                let articles = data.articles
                if(articles.length > 0){
                    
                    articles.sort((item1, item2) => {return item2.confidence - item1.confidence})
                    if(articles[0].article_name.indexOf("jacket") >= 0){
                        item.boundingbox = articles[0].bounding_box
                        try {
                            await item.save(); 
                        } catch (error) {
                            
                        }
                        console.log("Ok")
                    }
                }
               });
        }
    });
} catch (error) {
       console.log(error); 
}
})

module.exports = router;