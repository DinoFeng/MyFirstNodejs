var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/tb1';
var insertData = function(db, callback) {
    //连接到表
    var collection = db.collection('tb1');
    //插入数据
    var data = [{"field1":'wilson001',"field2":'21},{"field1":'wilson002',"field2":22}];
    collection.insert(data, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

    //查询数据
    collection.find().toArray(function (err, docs) {
        console.log('find');
        console.log(docs);
    });

MongoClient.connect(DB_CONN_STR, function(err, db) {
    console.log("连接成功！");
    insertData(db, function(result) {
        console.log(result);
        db.close();
    });
});
