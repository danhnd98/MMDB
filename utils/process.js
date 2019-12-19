var Algorithmia = require("algorithmia");
var fs = require("fs");

function requestAlgorithia(input) {
  return new Promise((resolve, reject) => {
    try {
      Algorithmia.client("simuVlTpmVZKo78cPwI121vFnPy1")
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
      if (articles[i].article_name.indexOf("jacket") >= 0) {
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
  return new Promise(async (resolve, reject) => {
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
  });
}

/* Call 20 request concurently */
async function runBatch(arr, start, count) {
  let buf = arr.slice(start, start + count);
  return new Promise((resolve, reject) => {
    Promise.allSettled(
      buf.map((item, index) => updateImagePromise(item, index + start))
    ).then(result => {
      console.log("Batch result: ", result);
      resolve();
    });
  });
}

module.exports = {runBatch}