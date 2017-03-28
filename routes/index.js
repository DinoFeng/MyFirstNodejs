var express = require('express');
var XLSX = require('xlsx');
var getExcel = require('../App_Code/getExcelFromDB');
var saveExcel = require('../App_Code/saveExcelToDB');
var Excel = require("../App_Code/excel");
var readExcelAsync = require("../App_Code/readExcel");
var Busboy = require('busboy');
var path = require('path');
var fs = require('fs');
var util = require('util');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log('------start to read excel------');

	// readExcelAsync('./excel/exceltest.xlsx')
	// 	.then(function(workbook){
	// 		console.log('----read excel successfully----');

	// 		var excel = new Excel({
	// 			bookName: 'exceltest.xlsx',
	// 			sheets: workbook.SheetNames.map(sheetName => {
	// 			const worksheet = workbook.Sheets[sheetName];
	// 			const keys = Object.keys(worksheet);
	// 			return {
	// 				sheetName: sheetName,
	// 				ref: worksheet['!ref'],
	// 				data: keys.filter(k => k[0] != '!').map(k => {
	// 				return {
	// 					position: k,
	// 					text: worksheet[k].v
	// 				}
	// 				})
	// 			}
	// 			})
	// 		});

	// 		return excel;
	// 	})
	// 	.then(function(excel){
	// 		return saveExcel(excel);
	// 	})
	// 	.then(function(promiseData){
	// 		return promiseData._id;
	// 	})
	// 	.then(function(id){
	// 		return getExcel(id);
	// 	})
	// 	.then(function(getPromiseData){
	// 		console.log(getPromiseData);
	// 	})
	// 	.error(function(error){
	// 		console.log(error);
	// 	});

	console.log('tsss');

	res.render('index', { title: 'NodeJS' });
});

router.post('/', function(req, res, next) {
	var busboy = new Busboy({ headers: req.headers });
	var test = new Array();
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
		// console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
		
		// file.on('data', function(data) {
        // 	console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
		// });
		// file.on('end', function() {
		// 	console.log('File [' + fieldname + '] Finished');
		// });

		var saveTo = path.join('./excel', path.basename(filename));
		test.push(filename);

    	file.pipe(fs.createWriteStream(saveTo));
    });
	
	busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + util.inspect(val));  
    });

    busboy.on('finish', function() {
		console.log('---successfully----');
		console.log(test.length);
		test.forEach(function(filename1){
			console.log(filename1);
		});
      res.writeHead(200, { 'Connection': 'close' });
      res.end("Upload successfully!");
    });

	busboy.on('error', function() {
		res.writeHead(500, { 'Connection': 'close' });
      	res.end("Upload failed!");
	});

	console.log('111');
    req.pipe(busboy);
	console.log('222');
});

module.exports = router;
