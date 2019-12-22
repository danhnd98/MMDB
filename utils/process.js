var Algorithmia = require("algorithmia");
var fs = require("fs");

const CLASSES = {'top handle bag': null,
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
'underwear': null};


function requestAlgorithia(input) {
  return new Promise((resolve, reject) => {
    try {
      Algorithmia.client("simhV8Ty/C2bnYtRr58KCXBLByH1") // other key: simmCt2Qtdd0c3hsMRCyfKngFly1
        .algo("algorithmiahq/DeepFashion/1.3.0?timeout=3000") // timeout is optional
        .pipe(input)
        .then(response => {
          try {
            let data = response.get();
            resolve(data);
          } catch (e) {
            reject(e);
          }
        });
    } catch (e) {
      reject(e);
    }
  });
}

async function udateImage(item, type) {
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
    let boundingBox;
    if (type == "t shirt") {
      boundingBox = classifyTShirt(articles);
    }
    if (type == "sweater") {
      boundingBox = classifySweater(articles);
    }
    if (type == "shirt") {
      boundingBox = classifyShirt(articles);
    }
    if (type == "trousers") {
      boundingBox = classifyTrouser(articles);
    }
    if (type == "jacket") {
      boundingBox = classifyJacket(articles);
    }
    if (type == "dress") {
      boundingBox = classifyDress(articles);
    }
    if (boundingBox) {
      item.boundingbox = boundingBox;
      try {
        await item.save();
      } catch (error) {
        // console.log(error);
        throw error;
      }
    }
  }
}

function classifyDress(articles) {
  let result = null;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("dress") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("skirt") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("tunic") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  return null;
}

function classifySweater(articles) {
  let result = null;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("sweat") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("shirt") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  return null;
}

function classifyTrouser(articles) {
  let result = null;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("pant") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  return null;
}

function classifyJacket(articles) {
  let result = null;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("jacket") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  return null;
}

function classifyTShirt(articles) {
  let result = null;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("t shirt") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("shirt") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("sweater") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  return null;
}

function classifyShirt(articles) {
  let result = null;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("shirt") >= 0) {
      result = articles[i].bounding_box;
      return result;
    }
  }
  return null;
}

function updateImagePromise(item, i, type) {
  return new Promise(async (resolve, reject) => {
    if (!item.boundingbox) {
      try {
        await udateImage(item, type);
        console.log("Processed", i, item.id);
        // resolve(item);
        resolve(true);
      } catch (error) {
        // reject(item);
        resolve(false);
        fs.appendFile("log.txt", `${item.id}: ${error}`, function(err) {
          //if (err) throw err;
          // console.log("Updated!");
        });
      }
    } else {
      // resolve(item);
      resolve(true);
      console.log("Skipped", i, item.id);
    }
  });
}

/* Call 20 request concurently */
async function runBatch(arr, start, count, type) {
  let buf = arr.slice(start, start + count);
  return new Promise((resolve, reject) => {
    Promise.all(
      buf.map((item, index) => updateImagePromise(item, index + start, type))
    ).then(result => {
      console.log("Batch result: ", result);
      resolve();
    });
  });
}

function readJSONFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, function(err, data) {
      try {
        resolve(JSON.parse(data));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function classifyGroup(name) {
  return CLASSES[name];
}

module.exports = { runBatch, readJSONFile };
