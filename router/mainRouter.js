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

    for (let i = 27; i < menJacket.length; i++) {
      let item = menJacket[i];
      
    }

    let i = 0;
    while (i < menJacket.length) {
      await runBatch(menJacket, i, 20);
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

function requestAlgorithia(input) {
  return new Promise((resolve, reject) => {
    try {
      Algorithmia.client("simEA2shH9/qq4tLnXJ2w/P8adR1")
        .algo("algorithmiahq/DeepFashion/1.3.0?timeout=3000") // timeout is optional
        .pipe(input)
        .then(response => {
            try {
                let data = response.get();
                resolve(data);
            } catch (e) {
                reject (e);
            }
        });
    } catch (e) {
      reject(e);
    }
  });
}

async function udateImage(item) {
  var input = {
    image: item.image_urls[0],
    model: "mid",
    threshold: 0.3,
    tags_only: true
  };

  if (input.image.slice(-3) == "svg") throw new Error("No svg files");

  let data;
  try {
    data = await requestAlgorithia(input);
  } catch (error) {
    throw error;
  }
  console.log(data);
  let articles = data.articles;
  console.log(articles)
  if (articles.length > 0) {
    /* 
      Khong cho sort nua
      Vi co the no van nhan ra jacket
      nhung do chinh xac ko cao bang cac cai khac
      */
    /*
    articles.sort((item1, item2) => {
      return item2.confidence - item1.confidence;
    });
    */
    for (let i = 0; i < articles.length; i++) {
      if (articles[i].article_name.indexOf("jean") >= 0) {
        item.boundingbox = articles[i].bounding_box;
        try {
          await item.save();
        } catch (error) {
          // console.log(error);
          throw error;
        }
        break;
      }
    }
  }
}

function updateImagePromise(item, i) {
  return new Promise( async (resolve, reject) => {
    if (!item.boundingbox) {
      try {
        await udateImage(item);
        console.log("Processed", i, item.id);
        resolve(item);
      } catch (error) {
        reject(item);
        fs.appendFile("log.txt", `${item.id}: ${error}`, function(err) {
          //if (err) throw err;
          // console.log("Updated!");
        });
      }
    } else {
      resolve(item);
      console.log("Skipped", i, item.id);
    }
  })
}

/* Call 20 request concurently */
async function runBatch(arr, start, count) {
  let buf = arr.slice(start, start + count);
  return new Promise((resolve, reject) => {
    Promise.allSettled(buf.map((item, index) => updateImagePromise(item, index + start)))
    .then(result => {
      console.log('Batch result: ', result);
      resolve();
    });
  })
}



module.exports = router;
