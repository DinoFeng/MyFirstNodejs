/**
 * Created by FengD on 2017-03-06.
 */
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/wilsondb1';
var invokeProcData = function(db, callback) {
    //存储过程调用
    db.eval('get_tb2_count()', function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}
MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    invokeProcData(db, function(result) {
        console.log(result);
        db.close();
    });
});