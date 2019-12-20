var Algorithmia = require("algorithmia");
var fs = require("fs");

function requestAlgorithia(input) {
  return new Promise((resolve, reject) => {
    try {
      Algorithmia.client("sim23arwXamQwQMA5p6W3YCXKRL1") // other key: sim+8S29FhplE+IO3tKbHuMIg3i1
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

function classifySweater(articles) {
  let result = null;
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].article_name.indexOf("sweater") >= 0) {
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

function updateImagePromise(item, i, type) {
  return new Promise(async (resolve, reject) => {
    if (!item.boundingbox) {
      try {
        await udateImage(item, type);
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
  });
}

/* Call 20 request concurently */
async function runBatch(arr, start, count, type) {
  let buf = arr.slice(start, start + count);
  return new Promise((resolve, reject) => {
    Promise.allSettled(
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
  if (name == "t shirt") return "t shirt";
  if (name == "") return "";
}
module.exports = { runBatch, readJSONFile };
