var fs = require("fs"),
  request = require("request");

var download = function(uri, filename, callback) {
  request.head(uri, function(err, res, body) {
    // console.log("content-type:", res.headers["content-type"]);
    // console.log("content-length:", res.headers["content-length"]);

    request(uri)
      .pipe(fs.createWriteStream(filename))
      .on("close", callback);
  });
};

var downloadAsync = function(uri, filename) {
    return new Promise((resolve, reject) => {
        try {
            download(uri, filename, () => {resolve(true)});
        } catch (e) {
            reject(false);
        }
    })
}
module.exports = { download, downloadAsync };
