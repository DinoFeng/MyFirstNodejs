var Promise = require('bluebird');
var XLSX = require('xlsx');

var readExcelAsync = (path) => {
    return new Promise(function(resolve, reject){
        try{
            var data = XLSX.readFile(path);
            resolve(data);
        }
        catch(e){
            reject(e);
        }
    });
};

module.exports = readExcelAsync;