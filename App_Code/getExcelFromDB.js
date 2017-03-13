// var MongoClient = require('mongodb').MongoClient;
// var DB_CONN_STR = 'mongodb://localhost:27017/test';

// var selectData = function(db, id, callback) {
//     //连接到表
//     var collection = db.collection('excel');
//     //查询数据
//     var whereStr = { _id: id };//{"name":'wilson001'};
//     collection.find(whereStr).toArray(function(err, result) {
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }
//         callback(result);
//     });
// }

// var getData = function (id) {
//     MongoClient.connect(DB_CONN_STR, function(err, db) {
//         console.log("连接成功！");
//         selectData(db, id, function(result) {
//             return result;
//             db.close();
//         });
//     });
// };

// module.exports = getData;

const Excel = require("./excel.js");

var getExcel = (id) => {
    var getResult = Excel.findOne({ '_id': id })
        .exec()
        .then(function(promiseResult){
            return promiseResult;
        })
        .error(function(error){
            return 'Promise Error:' + error;
        })

    return getResult;
};

module.exports = getExcel;