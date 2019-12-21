const express = require("express");
const MenJacket = require("../models/menJacket");
const MenJean = require("../models/menJean");
const MenShirt = require("../models/menShirt");
const MenSweater = require("../models/mensweater");
const MenJeans = require("../models/menJeans");
const MenShorts = require("../models/menShorts");
const MenTrouser = require("../models/menTrouser");
const MenTShirt = require("../models/menTShirt");
const Men = require("../models/men");
const WomenJacket = require("../models/womenJacket");
const WomenDress = require("../models/womenDress");
const WomenShirt = require("../models/womenShirt");
const WomenIShirt = require("../models/womenTShirt");
const Women = require("../models/women");
const multer = require("multer");
const sharp = require("sharp");
var fs = require("fs");
var Algorithmia = require("algorithmia");
const process = require('../utils/process');
const images = require('../utils/images');
var child_process = require("child_process");
// const cv = require('opencv4nodejs');


// var data = base64Img.base64Sync('./image/trungml.jpg');

const router = new express.Router();

const upload = multer({
  limits: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  }
});

router.post(
  "/search",
  upload.single("image"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .png()
      .toBuffer();
    let now = Date.now().toString() + ".png";
    fs.appendFile("./image/" + now, "", function(err) {
      if (err) throw err;
      console.log("Saved!");
    });
    console.log(now);
    let wrStream = fs.createWriteStream("./image/" + now);
    wrStream.write(buffer);

    res.send("ok");
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.get("/createboundingbox", async (req, res) => {
  let cate = req.query.Category;
  console.log("Run");
  try {
    let menSweater = await WomenJacket.find();
    // let menShirt = await process.readJSONFile('menshirt.json');
    console.log("load done!");
    
    console.log("Loaded ", menSweater.length);

    // node menJacket = [menJacket[300]];

    let i = 0;
    while (i < menSweater.length) {
      //for (let j = 0; j < 20; j++) {
      //  menShirt[i] = await MenShirt.findById(menShirt[i+j]._id);
      //}
      await process.runBatch(menSweater, i, 20, 'jacket');
      i += 20;
    }
    // console.log(menJacket[7]);
    res.status(200).send("ok");
  } catch (error) {
    console.log(error);
    res.status(200).send("Toang, đoc console ngay đi");
  }
});

router.get("/check", async (req, res) => {
  let cate = req.query.Category;
  console.log("Run");
  try {
    let menJacket = await MenJean.find();
    console.log("load done!");
    console.log("Loaded ", menJacket.length);

    // node menJacket = [menJacket[300]];
    fs.writeFile("log.txt", "", function(err) {
      // if (err) throw err;
      // console.log("Saved!");
    });

    for (let i = 27; i < menJacket.length; i++) {
      let item = menJacket[i];
      
    }

    let i = 0;
    let j = 0;
    while (i < menJacket.length) {
      if(menJacket[i].boundingbox)
      j++
      i++
    }
    // console.log(menJacket[7]);
    res.status(200).send(j + "/" + i);
  } catch (error) {
    console.log(error);
    res.status(200).send("Toang, đoc console ngay đi");
  }
});

router.get('/cropall', async(req, res) => {
  try {
    let path = 'image/men-tshirts'
    res.status(200).send('OK');
    console.log('Running');
    let menJacket = await MenTShirt.find();
    console.log('Loaded', menJacket.length);
    for (let i = 2234; i < menJacket.length; i++) {
      if (menJacket[i].boundingbox) {
        try {
          await images.downloadAsync(menJacket[i].image_urls[0], `${path}/${menJacket[i].id}.jpg`);
          let boundingBox = menJacket[i].boundingbox;
          /*
          const img = cv.imread(`${path}/${menJacket[i].id}.jpg`);
          let mat = img.getRegion(new cv.Rect())
          mat = cv.imwrite(`${path}/${menJacket[i].id}-cropped.jpg`, mat);
          */
          let command = `python "/home/kaito/Documents/Studies/Multimedia database/MMDB/router/cropImage.py" "/home/kaito/Documents/Studies/Multimedia database/MMDB/${path}/${menJacket[i].id}.jpg" "/home/kaito/Documents/Studies/Multimedia database/MMDB/${path}/${menJacket[i].id}-cropped.jpg" ${boundingBox.x0} ${boundingBox.y0} ${boundingBox.x1 - boundingBox.x0} ${boundingBox.y1 - boundingBox.y0}`
          console.log(command);
         let cmd = child_process.exec(command);
          console.log('Downloaded', i, menJacket[i].id);
          cmd.stdout.on('data', function(data) { 
            console.log(data.toString())
        } ) 
        } catch(e) {
          console.error(e);
          console.log('Rejected', i, menJacket[i].id);
        }
      } else {
        console.log('Skipped', i, menJacket[i].id);
      }
    }
    
  } catch {
    res.status(200).send('Not ok');
  }
})
module.exports = router;
