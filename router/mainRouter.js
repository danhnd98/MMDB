const express = require("express");
const MenJacket = require("../models/menJacket");
const MenJean = require("../models/menJean");
const MenShirt = require("../models/menShirt");
<<<<<<< HEAD
const MenShort = require("../models/menShorts");
=======
const MenSweater = require("../models/mensweater");
const MenJeans = require("../models/menJeans");
const MenShorts = require("../models/menShorts");
>>>>>>> 51dfbc3e49e7cef5619296fd38b4c8be5b8bfc8a
const MenTrouser = require("../models/menTrouser");
const MenTShirt = require("../models/menTShirt");
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
<<<<<<< HEAD
const {process, inputImage} = require('../utils/process');
=======
const process = require('../utils/process');
const images = require('../utils/images');
var child_process = require("child_process");
// const cv = require('opencv4nodejs');

>>>>>>> 51dfbc3e49e7cef5619296fd38b4c8be5b8bfc8a

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

router.post("/uploadimage", async(req, res) =>{
  let image = req.body.image
  let gender = req.body.gender
  res.status(200).send("OK")
});

router.post("/uploadimage1", async(req, res) =>{
  let image = req.body.image
  let gender = req.body.gender
  //0 = MEN, 1 = WOMEN

  console.log("REQ")
  // let response = await inputImage(image);
  // let listCategory = [];
      
  // let listDBCollecion = [];
  // if(response.articles.length > 0){
  //   response.articles.forEach(item => {
  //     if(LISTCATEGORY[item.article_name]){
  //       listCategory.push(LISTCATEGORY[item.article_name])
  //     }
  //   });
  //   console.log(listCategory)
  // }
  
  // if(listCategory.length > 0){
  //   listCategory.forEach(item => {
  //     if(req.body.gender == 0){
  //       console.log(item)
  //       if(CLASSESMEN[item]){
  //         listDBCollecion.push(CLASSESMEN[item])
  //       } 
  //     }else{
  //       if(CLASSESWOMEN[item]){
  //         listDBCollecion.push(CLASSESWOMEN[item])
  //       }
  //     }
  //   })
  // }
  // console.log(listDBCollecion)

  //Get List Color

  const loopTest = [10, 20, 30, 40, 50];

  const expectedList = [];
  const color = [ 200, 100, 237 ];
  listDBCollecion = ["MenShirt"];
  if(listDBCollecion.length){
     await listDBCollecion.forEach(async (item) => {
      let dbCollection = item;
      if(dbCollection == "MenJacket"){
        let listExpectedIem = await loadExpectImage(MenJacket, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "MenJean"){
        let listExpectedIem = await loadExpectImage(MenJean, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "MenShirt"){
        let listExpectedIem = await loadExpectImage(MenShirt, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "MenTrouser"){
        let listExpectedIem = await loadExpectImage(MenTrouser, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "MenTShirt"){
        let listExpectedIem = await loadExpectImage(MenTShirt, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "MenShort"){
        let listExpectedIem = await loadExpectImage(MenShort, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "MenSweater"){
        let listExpectedIem = await loadExpectImage(MenSweater, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "WomenTShirt"){
        let listExpectedIem = await loadExpectImage(WomenTShirt, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "WomenDress"){
        let listExpectedIem = await loadExpectImage(WomenDress, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "WomenShirt"){
        let listExpectedIem = await loadExpectImage(WomenShirt, color);
        expectedList.push(listExpectedIem)
      }
      if(dbCollection == "WomenJacket"){
        let listExpectedIem = await loadExpectImage(WomenJacket, color);
        expectedList.push(listExpectedIem)
      }
    })
  }

  console.log(expectedList)
  console.log("Done")
  res.status(200).send(expectedList);
})

router.get("/createboundingbox", async (req, res) => {
  let cate = req.query.Category;
  console.log("Run");
  try {
<<<<<<< HEAD
    let menJacket = await MenShort.find();
=======
    let menSweater = await MenSweater.find();
    // let menShirt = await process.readJSONFile('menshirt.json');
>>>>>>> 51dfbc3e49e7cef5619296fd38b4c8be5b8bfc8a
    console.log("load done!");
    
    console.log("Loaded ", menSweater.length);

    // node menJacket = [menJacket[300]];

<<<<<<< HEAD
    let i = 1000;
    while (i < menJacket.length) {
      await process.runBatch(menJacket, i, 20);
=======
    let i = 0;
    while (i < menSweater.length) {
      //for (let j = 0; j < 20; j++) {
      //  menShirt[i] = await MenShirt.findById(menShirt[i+j]._id);
      //}
      await process.runBatch(menSweater, i, 20, 'sweater');
>>>>>>> 51dfbc3e49e7cef5619296fd38b4c8be5b8bfc8a
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

<<<<<<< HEAD
async function loadExpectImage(collection, color){
  let all =  await collection.find();
  return getList(color, all)
}

const loopTest = [10, 20, 30, 40, 50];

const getListByColor = ( listItem, color, range) => {
	let expectedList = [];

	listItem.forEach(item => {
  	const currentColor = item.color;
    let isExpectItem = true;
    for (let i=0; i<=2; i++) {
    	if (currentColor[i] + range < color[i] || currentColor[i] - range > color[i]) {
      	isExpectItem = false;
      }
    };
    if (isExpectItem) {
      expectedList.push(item);
    }
  });
  
  return expectedList;
};

const getList = (color, listItem) => {
	let list = [];
	for (let i=5; i<=5; i+=5) {
  	let list = getListByColor( listItem, color, 30);
    if (list.length >=10) {
      console.log(list)
    	return list;
    } else {
    	list = [];
    }
  };
  console.log("No")
  return list;
}

const LISTCATEGORY = {'top handle bag': null,
't shirt': 't shirt', // -> t shirt
'jewelry': null,
'boots': null,
'sunglasses': null,
'jeans': 'jeans',
'sweater': 'sweater', // -> shirt
'tank top': 't shirt', 
'skirt': 'dress',
'sandals': null,
'leggings': null,
'button down shirt': 'shirt', // -> shirt
'pants casual': 'trousers',
'heels pumps or wedges': null,
'lingerie': null,
'blouse': null,
'lightweight jacket': 'jacket',
'casual dress': 'dress',
'winter jacket': 'jacket',
'formal dress': 'dress',
'watches': null,
'hat': null,
'vest': null,
'sneakers': null,
'shoulder bag': null,
'flats': null,
'overall': null,
'sweatpants': 'trousers',
'shorts': 'shorts',
'rompers': null,
'pants suit formal': 'trousers',
'glasses': null,
'clutches': null,
'socks': null,
'backpack or messenger bag': null,
'jumpsuit': null,
'running shoes': null,
'blazer': null,
'tunic': 'dress',
'hosiery': null,
'denim jacket': 'jacket',
'belts': null,
'leather jacket': 'jacket',
'trenchcoat': null,
'headwrap': null,
'sweater dress': 'dress',
'sweatshirt': 'sweater',
'gloves': null,
'underwear': null
};

const CLASSESWOMEN = {
't shirt': 'WomenTShirt', // -> t shirt
'dress': 'WomenDress',
'shirt': 'WomenShirt',
'jacket': 'WomenJacket',
'trousers': null,
'jeans': null,
'sweater': null,
'shorts': null
};

const CLASSESMEN = {
  't shirt': 'MenTShirt', // -> t shirt
  'jacket': 'MenJacket',    
  'shirt': 'MenShirt',
  'trousers': 'MenTrouser',
  'jeans': 'MenJean',
  'sweater': 'MenSweater',
  'dress': null,
  'shorts': 'MenShort'
};


=======
router.get('/cropall', async(req, res) => {
  try {
    let path = 'image/men-shirts'
    res.status(200).send('OK');
    console.log('Running');
    let menJacket = await MenShirt.find();
    console.log('Loaded', menJacket.length);
    for (let i = 2780; i < menJacket.length; i++) {
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
>>>>>>> 51dfbc3e49e7cef5619296fd38b4c8be5b8bfc8a
module.exports = router;
