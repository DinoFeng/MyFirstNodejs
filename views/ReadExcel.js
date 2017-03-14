var xlsx = require("node-xlsx");

var excelName='test.xlsx';
var list = xlsx.parse("../excel/" + excelName);

var jsonstr=JSON.stringify(list);
console.log(jsonstr);
