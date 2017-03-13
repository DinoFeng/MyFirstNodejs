var express = require('express');
var XLSX = require('xlsx');
var getExcel = require('../App_Code/getExcelFromDB');
var saveExcel = require('../App_Code/saveExcelToDB');
var Excel = require("../App_Code/excel");
var readExcelAsync = require("../App_Code/readExcel");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('------start to read excel------');

	readExcelAsync('./excel/exceltest.xlsx')
		.then(function(workbook){
			console.log('----read excel successfully----');

			var excel = new Excel({
				bookName: 'exceltest.xlsx',
				sheets: workbook.SheetNames.map(sheetName => {
				const worksheet = workbook.Sheets[sheetName];
				const keys = Object.keys(worksheet);
				return {
					sheetName: sheetName,
					ref: worksheet['!ref'],
					data: keys.filter(k => k[0] != '!').map(k => {
					return {
						position: k,
						text: worksheet[k].v
					}
					})
				}
				})
			});

			return excel;
		})
		.then(function(excel){
			return saveExcel(excel);
		})
		.then(function(promiseData){
			return promiseData._id;
		})
		.then(function(id){
			return getExcel(id);
		})
		.then(function(getPromiseData){
			console.log(getPromiseData);
		})
		.error(function(error){
			console.log(error);
		});

	console.log('tsss');

	res.render('index', { title: 'NodeJS' });
});

module.exports = router;
