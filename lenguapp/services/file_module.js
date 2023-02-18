const fs = require('fs');
const pathModule = require('path');
const exts = require('./exts')

var pipe_extensions = {};
var pipe_extension_id = 0;

//parser et retourner un fichier vers le front
function pipeFile (req, res, path, type, opt_cb) {

    
    if (typeof path !== "string") {
      throw new TypeError("path must be a string value");
    }

    var total = fileInfo(path);

    console.log("total",total)

    if (total == null) {
        res.end(path + " not found");
        return false;
    }
    var range = getRange(req, total);
    
    // nom d'extension 
    var ext = pathModule.extname(path).toLowerCase();
    console.log("ext",ext)

    if (!type && ext && ext.length) {
        type = exts[ext];
        //format en fonction de l'extension
        console.log("format",exts[ext])
    }

    if (type && type.length && type[0] == '.') {
        ext = type;
        type = exts[type];
        console.log("format2",type)
    }

    if (!type || !type.length) {
        res.write("Media format not found for " + pathModule.basename(path));
    }
    else {
        // range 
        var file = fs.createReadStream(path, {start: range[0], end: range[1]});
        
        //callback de fermeture de fichier selon l'event listener
        let counter = 0;
        var cleanupFileStream = function() {
          counter++;
          console.log("fermeture",counter);
          file.close();
        }

        // the event emitted seems to change based on version of node.js
        // 'close' is fired as of v6.11.5
        res.on('close', cleanupFileStream); // https://stackoverflow.com/a/9021242
        res.on('end', cleanupFileStream);  // https://stackoverflow.com/a/16897986
        res.on('finish', cleanupFileStream); // https://stackoverflow.com/a/14093091 - https://stackoverflow.com/a/38057516
       
       
        // construction de l'header
        if (!ext.length || !pipe_extensions[ext]) {
            var header = {
              'Content-Length': range[1],
              'Content-Type': type,
              'Access-Control-Allow-Origin': req.headers.origin || "*",
              'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
              'Access-Control-Allow-Headers': 'POST, GET, OPTIONS'
            };

            
            if (range[2]) {
                header['Accept-Ranges'] = 'bytes';
                header['Content-Range'] = 'bytes ' + range[0] + '-' + range[1] + '/' + total;
                header['Content-Length'] = range[2];
        
                res.writeHead(206, header);
            } else {
                res.writeHead(200, header);
            }
            console.log("header created",header);
            //Put ReadStream content in Res, wich is a Write Stream iguess
            file.pipe(res);
            file.on('close', function () {
                res.end(0);
                if (opt_cb && typeof opt_cb == 'function') {
                  opt_cb(path);
                }
              });
        }
    }
    
}

//recupérer la taille du fichier s'il existe
var fileInfo = function (path) {
    if (path) {
        //si le file exist pas return null
        if (!fs.existsSync(path)) {
          return null;
        }
        var stat = fs.statSync(path);
        // on retourne donc les stats
        return stat.size;
    }
    else {
        return 0;
    }
    
  };

  // range ?? pourquoi?
  const getRange = function (req,total) {
    var range = [0, total, 0];
    var rinfo = req.headers ? req.headers.range : null;
    console.log("range",range) 
    console.log("rinfo",rinfo)
    if (rinfo) {
        var rloc = rinfo.indexOf('bytes=');
        console.log("rloc",rloc)
        if (rloc >= 0) {
            var ranges = rinfo.substr(rloc + 6).split('-');
            try {
              range[0] = parseInt(ranges[0]);
              if (ranges[1] && ranges[1].length) {
                range[1] = parseInt(ranges[1]);
                range[1] = range[1] < 16 ? 16 : range[1];
              }
            } catch (e) {}
          }
          if (range[1] == total)
          range[1]--;
     
          range[2] = total;
    }
    return range;
  }

  module.exports = {
    fileInfo,
    pipeFile
  }