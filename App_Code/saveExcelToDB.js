// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/test';

// var insertData = function(db, data, callback) {
//     //连接到表
//     var collection = db.collection('excel');
//     //插入数据
//     collection.insert(data, function(err, result) {
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }
//         callback(result);
//     });
// }

// var saveData = function (data) {
//     MongoClient.connect(DB_CONN_STR, function(err, db) {
//         console.log("连接成功！");
//         insertData(db, data, function(result) {
//             return result;
//             db.close();
//         });
//     });
// };

// module.exports = saveData;

var Excel = require("./excel.js");

/**
 * 插入
 */
var saveExcel = (data) => {
    var getResult = data.save()
        .then(function(promiseResult){
            return promiseResult;
        })
        .error(function(error){
            return 'Promise Error:' + error;
        });

    return getResult;
};

module.exports = saveExcel;