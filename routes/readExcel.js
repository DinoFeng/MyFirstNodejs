/*node_xj  = require("xls-to-json");


  node_xj({
    input: "test.xls",  // input xls 
    output: "output.json" // output json     
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log('JSON result:'+JSON.stringify(result));
    }
  });
*/

var XLSX = require('xlsx');
const workbook = XLSX.readFile('./test.xlsx');
 console.log('Read Excel Done.');

const sheetNames = workbook.SheetNames; 
 console.log('SheetNames:'+sheetNames);
 
 var excelJSONStr="";

sheetNames.forEach(function(y) {
    var worksheet = workbook.Sheets[y];
    var data = [];
    for(z in worksheet) {
        if(z[0] === '!') continue;

 //console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
 var curData='"'+y+"!"+z+'":"'+worksheet[z].v+'"';
 console.log(curData);

 if(excelJSONStr==""){excelJSONStr=curData}
 else{excelJSONStr=excelJSONStr+","+curData
 }

    }

});

excelJSONStr="{"+excelJSONStr+"}";
    console.log(excelJSONStr);


var jsonstr1=JSON.parse(JSON.stringify(excelJSONStr));
 console.log(jsonstr1);

/*var  mongodb = require('mongodb');
var  server  = new mongodb.Server('localhost', 27017, {auto_reconnect:true});
var  db = new mongodb.Db('test1', server, {safe:true});
var collection = db.collection('test1');


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
        collection.insert(jsonstr1,function(err,result){
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

    }*/

//const worksheet = workbook.Sheets[sheetNames[0]];
//console.log(worksheet);

var mongodb = require('mongodb');

var server = new mongodb.Server("localhost",27017,{});//本地27017端口

new mongodb.Db('local',server,{}).open(function(error,client){//数据库：mongotest
    if(error) throw error;
    var collection = new mongodb.Collection(client,'test');//表：user

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


});
//var sheet1Json= XLSX.utils.sheet_to_json(worksheet);
//console.log(sheet1Json);


