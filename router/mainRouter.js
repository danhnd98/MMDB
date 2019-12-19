const express = require("express");
const MenJacket = require("../models/menJacket");
const MenJean = require("../models/menJean");
const MenShirt = require("../models/menShirt");
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
    let menJacket = await MenJean.find();
    console.log("load done!");
    console.log("Loaded ", menJacket.length);

    // node menJacket = [menJacket[300]];
    fs.writeFile("log.txt", "", function(err) {
      // if (err) throw err;
      // console.log("Saved!");
    });

    let i = 410;
    while (i < menJacket.length) {
      await process.runBatch(menJacket, i, 20);
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

module.exports = router;
