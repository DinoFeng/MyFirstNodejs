var _field1,_field2;
var field1="",field2="";

var classes=function(field1,field2){_field1=field1;_field2=field2;};
classes.prototype.getname=function(){return _field1;};
classes.prototype.getage=function(){return _field2;};

classes.prototype.setname=function(field1){_field1=field1;};
classes.prototype.setage=function(field2){_field2=field2;};

classes.prototype.field1=field1;
classes.prototype.field2=field2;

classes.staticname="";

classes.staticfun=function(){console.log(classes.staticname);};
module.exports=classes;
