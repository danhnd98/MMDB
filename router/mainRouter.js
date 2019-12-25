const express = require("express");
const MenJacket = require("../models/menJacket");
const MenJean = require("../models/menJean");
const MenShirt = require("../models/menShirt");
const MenSweater = require("../models/mensweater");
const MenJeans = require("../models/menJeans");
const MenShorts = require("../models/menShorts");
const MenTrouser = require("../models/menTrouser");
const MenTShirt = require("../models/menTShirt");
var distanceSquared = require('euclidean-distance/squared')
const Men = require("../models/men");
const WomenJacket = require("../models/womenJacket");
const WomenDress = require("../models/womenDress");
const WomenShirt = require("../models/womenShirt");
const WomenTShirt = require("../models/womenTShirt");
const Women = require("../models/women");
const multer = require("multer");
const sharp = require("sharp");
var fs = require("fs");
var Algorithmia = require("algorithmia");
const base64Img = require('base64-img');
const { process, inputImage, readJSONFile } = require("../utils/process");
const images = require("../utils/images");
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
    let now = Date.now().toString() + ".jpg";
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

router.post("/uploadimage", async (req, res) => {
  let image = req.body.image;
  let gender = req.body.gender;
  res.status(200).send("OK");
});

function getColor(base64) {
  // save image
  let timeStamp = new Date().getTime();
  console.log('Base64', base64.slice(0, 20));

  let filePath = base64Img.imgSync(base64, "./queries/", timeStamp, ()=>{
    console.log("Done")
    //resolve(temp + '.jpg');
  })
  return new Promise((resolve, reject) => {
    let command = `python3 "./python/detectcolors.py" "${filePath}"`;
    console.log(command);
    let cmd = child_process.exec(command);
    cmd.stdout.on("data", function(data) {
      //c///onsole.log(JSON.parse(data));
      resolve(JSON.parse(data));
    });
  });
}

// Xử lý ảnh
// Gửi ảnh đến algorithmia
// tính color cho ảnh
function executeImage(image) {
  return new Promise((resolve, reject) => {
    Promise.allSettled([getColor(image), inputImage(image)]).then(result => {
      //console.log(result);
      let res = {
        color: result[0].value,
        response: result[1].value
      };
      resolve(res);
    })
  });
}

router.post("/uploadimage1", async (req, res) => {
  console.log(req.body);
  let image = req.body.image;
  console.log('Image:', image.slice(0, 40));
  let gender = req.body.gender;
  //0 = MEN, 1 = WOMEN

  let {response, color} = await executeImage(image);
  console.log('color', color);

  console.log("REQ");
  
  let listCategory = [];

  let listDBCollecion = [];
  if(response.articles.length > 0){
    response.articles.forEach(item => {
      if(LISTCATEGORY[item.article_name]){
        listCategory.push(LISTCATEGORY[item.article_name])
      }
    });
    console.log(listCategory)
  }

  if(listCategory.length > 0){
    listCategory.forEach(item => {
      if(req.body.gender == 0){
        console.log(item)
        if(CLASSESMEN[item]){
          listDBCollecion.push(CLASSESMEN[item])
        }
      }else{
        if(CLASSESWOMEN[item]){
          listDBCollecion.push(CLASSESWOMEN[item])
        }
      }
    })
  }
  console.log(listDBCollecion)

  const loopTest = [10, 20, 30, 40, 50];

  let expectedList = [];
  // const color = [240, 240, 240];
  // listDBCollecion = ["MenShirt"];

  // FOREACH ko dung dc await dau nhe
  
  for (let i = 0; i < listDBCollecion.length; i++) {
    let dbCollection = listDBCollecion[i];
    if (dbCollection == "MenJacket") {
      let listExpectedIem = await loadExpectImage(MenJacket, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "MenJean") {
      let listExpectedIem = await loadExpectImage(MenJean, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "MenShirt") {
      let listExpectedIem = await loadExpectImage(MenShirt, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "MenTrouser") {
      let listExpectedIem = await loadExpectImage(MenTrouser, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "MenTShirt") {
      let listExpectedIem = await loadExpectImage(MenTShirt, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "MenShort") {
      let listExpectedIem = await loadExpectImage(MenShort, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "MenSweater") {
      let listExpectedIem = await loadExpectImage(MenSweater, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "WomenTShirt") {
      let listExpectedIem = await loadExpectImage(WomenTShirt, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "WomenDress") {
      let listExpectedIem = await loadExpectImage(WomenDress, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "WomenShirt") {
      let listExpectedIem = await loadExpectImage(WomenShirt, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
    if (dbCollection == "WomenJacket") {
      let listExpectedIem = await loadExpectImage(WomenJacket, color);
      expectedList = expectedList.concat(listExpectedIem);
    }
  }

  console.log(expectedList);
  console.log("Done");
  res.status(200).send(expectedList);
});

router.get("/createboundingbox", async (req, res) => {
  let cate = req.query.Category;
  console.log("Run");
  try {
    let menSweater = await MenSweater.find();
    // let menShirt = await process.readJSONFile('menshirt.json');
    console.log("load done!");

    console.log("Loaded ", menSweater.length);

    // node menJacket = [menJacket[300]];

    let i = 0;
    while (i < menSweater.length) {
      //for (let j = 0; j < 20; j++) {
      //  menShirt[i] = await MenShirt.findById(menShirt[i+j]._id);
      //}
      await process.runBatch(menSweater, i, 20, "sweater");
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

    let i = 0;
    let j = 0;
    while (i < menJacket.length) {
      if (menJacket[i].boundingbox) j++;
      i++;
    }
    // console.log(menJacket[7]);
    res.status(200).send(j + "/" + i);
  } catch (error) {
    console.log(error);
    res.status(200).send("Toang, đoc console ngay đi");
  }
});

async function loadExpectImage(collection, color) {
  let all = await collection.find({}, {color: 1});
  return await getList(color, all, collection);
}

const loopTest = [10, 20, 30, 40, 50];

/*
const getListByColor = (listItem, color, range) => {
  let expectedList = listItem.filter(item => {
    const currentColor = item.color;
    let isExpectItem = true;
    try {
      isExpectItem =  <= range;
    }  catch(e) {
      isExpectItem = false;
    }
    return isExpectItem;
  })
  
  return expectedList;
};
*/

const getList = async (color, listItem, collection) => {
  let list = [];
  let start = new Date();
  listItem = listItem.map(item => 
   Object.assign(item, {distance: Math.max(Math.max(Math.abs(item.color[0] - color[0]), Math.abs(item.color[1] - color[1])), Math.abs(item.color[2] - color[2]))})
  )
  
  listItem.sort((a, b) => a.distance - b.distance);

  /*
  for (let i = 10; i <= 30; i += 5) {
    let list = listItem.filter(item => item.distance <= i)
    if (list.length >= 10) {
      console.log(list);
      console.log('Range', i);
      let end = new Date();
      console.log(end - start);


      list.sort((a, b) => distanceSquared(b.color, color) - distanceSquared(a.color, color));
      return list;
    } else {
      list = [];
    }
  }
  
  */
  listItem = listItem.filter((s, index) => index < 10)
  listItem.sort((a, b) => distanceSquared(a.color, color) - distanceSquared(b.color, color));

  listItem = await Promise.all(listItem.map(item => collection.findById(item._id, {link: 1, title: 1, final_price: 1, images: 1})))
  return listItem;

  console.log("No");
  return list;
};

const LISTCATEGORY = {
  "top handle bag": null,
  "t shirt": "t shirt", // -> t shirt
  jewelry: null,
  boots: null,
  sunglasses: null,
  jeans: "jeans",
  sweater: "sweater", // -> shirt
  "tank top": "t shirt",
  skirt: "dress",
  sandals: null,
  leggings: null,
  "button down shirt": "shirt", // -> shirt
  "pants casual": "trousers",
  "heels pumps or wedges": null,
  lingerie: null,
  blouse: null,
  "lightweight jacket": "jacket",
  "casual dress": "dress",
  "winter jacket": "jacket",
  "formal dress": "dress",
  watches: null,
  hat: null,
  vest: null,
  sneakers: null,
  "shoulder bag": null,
  flats: null,
  overall: null,
  sweatpants: "trousers",
  shorts: "shorts",
  rompers: null,
  "pants suit formal": "trousers",
  glasses: null,
  clutches: null,
  socks: null,
  "backpack or messenger bag": null,
  jumpsuit: null,
  "running shoes": null,
  blazer: null,
  tunic: "dress",
  hosiery: null,
  "denim jacket": "jacket",
  belts: null,
  "leather jacket": "jacket",
  trenchcoat: null,
  headwrap: null,
  "sweater dress": "dress",
  sweatshirt: "sweater",
  gloves: null,
  underwear: null
};

const CLASSESWOMEN = {
  "t shirt": "WomenTShirt", // -> t shirt
  dress: "WomenDress",
  shirt: "WomenShirt",
  jacket: "WomenJacket",
  trousers: null,
  jeans: null,
  sweater: null,
  shorts: null
};

const CLASSESMEN = {
  "t shirt": "MenTShirt", // -> t shirt
  jacket: "MenJacket",
  shirt: "MenShirt",
  trousers: "MenTrouser",
  jeans: "MenJean",
  sweater: "MenSweater",
  dress: null,
  shorts: "MenShort"
};

module.exports = router;
