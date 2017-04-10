var xlsx = require("node-xlsx");
var classTB = require("../App_Code/classTable");

//读取EXCEL数据 [{"name":"Sheet1","data":[["A1","A2"],["Date1","Date2"],["Int1","Int2"]]}]
var excelName='test.xlsx';
//var list = xlsx.parse("../MyFristNodejs/excel/" + excelName);
var list = xlsx.parse("../excel/" + excelName);

//循环取数，生成mongoDB Insert的JSON
var data1=list[0].data;
var tbList=[];
for(var i=0;i<data1.length;i++) {
    var item=data1[i];
    var tb = new classTB();
    tb.field1 = item[0];
    tb.field2 = item[1];
    tbList.push(tb);
}

var jsonstr1=JSON.stringify(data1);  //[["A1","A2"],["Date1","Date2"],["Int1","Int2"]]
var jsonstr2=JSON.stringify(tbList);  // [{"field1":"A1","field2":"A2"},{"field1":"Date1","field2":"Date2"},{"field1":"Int1","field2":"Int2"}
console.log(jsonstr1)
console.log(jsonstr2)

//连接MongoDB
var  mongodb = require('mongodb')
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('tb1', server, {safe:true});
var collection = db.collection('tb1');



//连接db
db.open(function(err,db) {
    if (!err) {
        console.log('=========================================================');
        console.log('connect db');

        //删除所有数据
         collection.remove(function(err,result){
             if(err)
             {
                 console.log('Error:'+ err);
                 return;
             }
             console.log('=========================================================');
             console.log('Delete:');
             console.log(JSON.stringify(result));
         });

        //保存数据
        collection.insert(tbList,function(err,result){
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            console.log('=========================================================');
            console.log('Insert:');
            console.log(JSON.stringify(result));
        });

        //查询数据
        collection.find().toArray(function (err, docs) {
            console.log('=========================================================');
            console.log('find:');
            console.log(JSON.stringify(docs));
            console.log('=========================================================');
        });

    }
});



