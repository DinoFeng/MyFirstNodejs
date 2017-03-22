require('../../App_Code/stringExt');

var express = require('express');
var router = express.Router();

//https://nodejs.org/docs/latest/api/path.html
var path = require('path');
//https://nodejs.org/docs/latest/api/os.html
var os = require('os');
//https://nodejs.org/docs/latest/api/fs.html
var fs = require('fs');
//https://www.npmjs.com/package/busboy
var Busboy=require('busboy');



/* GET users listing. */
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  var busboy = new Busboy({ headers: req.headers });
  //Emitted for each new file form field found. transferEncoding contains the 'Content-Transfer-Encoding' value for the file stream. mimeType contains the 'Content-Type' value for the file stream.
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    //Note: if you listen for this event, you should always handle the stream no matter if you care about the file contents or not (e.g. you can simply just do stream.resume(); if you want to discard the contents), otherwise the 'finish' event will never fire on the Busboy instance. However, if you don't care about any incoming files, you can simply not listen for the 'file' event at all and any/all files will be automatically and safely discarded (these discarded files do still count towards files and parts limits).
    //If a configured file size limit was reached, stream will both have a boolean property truncated (best checked at the end of the stream) and emit a 'limit' event to notify you when this happens.
    console.log('onfile FieldName[{0}]: FileName:{1}, Endcoding:{2}, MimeType:{3}'
      .format(fieldname,filename,encoding,mimetype));

//console.log(process.path+','+req.path);
    var saveTo = path.join('./uploadFile', path.basename(filename));

 //   console.log(saveTo);

    file.pipe(fs.createWriteStream(saveTo));
/*
    //console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
    

    file.on('data', function(data) {
        //console.log('File on data File [' + fieldname + '] got ' + data.length + ' bytes');
      console.log('File on data File [{0}] got {1} bytes'
        .format(filename,data.length));
    });

    file.on('end', function() {
      //console.log('File [' + fieldname + '] Finished');
      console.log('File on end File[{0}] Finished.'
      .format(filename));
    });

*/
  });
  
  //Emitted for each new non-file field found.
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    //console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    //console.log('Field [' + fieldname + ']: value: ' + val);
    console.log('onfield FieldName[{0}]:value:{1}, FileldNameTruncated:{2}, ValTruncated:{3}, Endcoding:{4}, MimeTyle:{5}'
        .format(fieldname,val,fieldnameTruncated,valTruncated,encoding,mimetype));
    });
    
  //Emitted when specified parts limit has been reached. No more 'file' or 'field' events will be emitted.
  busboy.on('partsLimit',function(){});
  //Emitted when specified files limit has been reached. No more 'file' events will be emitted.
  busboy.on('filesLimit',function(){});
  //Emitted when specified fields limit has been reached. No more 'field' events will be emitted.
  busboy.on('fieldsLimit',function(){});

  busboy.on('finish', function() {
    console.log('Done parsing form!');
    //res.writeHead(303, { Connection: 'close', Location: '/' });
    //res.end();

  //  res.writeHead(200, { 'Connection': 'close' });
    
    res.json({resultType:'Success',results:'',resultMsg:'',exceptionDetail:null});
    res.end();
    //res.end("That's all folks!");
  });
  req.pipe(busboy);
  //next();
});

module.exports = router;

