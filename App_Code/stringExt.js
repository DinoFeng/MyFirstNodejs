////////// <reference path="jquery-1.8.3.js" />

//V1 method
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function(m, i) {
            return args[i];
        });
};
//V2 static
String.format = function() {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }
    return str;
};
String.prototype.repeat = function(n) {
    var arr = new Array(n + 1);
    return arr.join(this);
};
String.repeat = function(s,n) {    
    return s.repeat(n);
};
String.prototype.toDate = function(f) {
    if (f == undefined) {
        f = 'ymd';
    }
    else {
        f = f.replace(/([-.\/])/g, '');
        if (f != 'ymd' && f != 'mdy' && f != 'dmy') {
            f = 'ymd';
        }
    }

    var s = this.replace(/([-.\/])/g, '-');
    var ss = s.split('-');
    var y = parseInt(ss[f.indexOf('y')], 10);
    var m = parseInt(ss[f.indexOf('m')], 10);
    var d = parseInt(ss[f.indexOf('d')], 10);
    if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
        return new Date(y, m - 1, d);
    } else {
        return new Date();
    }
};
String.toDate = function(s, f) {
    return s.toDate(f);
};
Date.prototype.toFormatString = function(f, sp) {
    if (f == undefined) {
        f = 'y-m-d';
    }
    else {
        f = f.replace(/([-.\/])/g, '');
        if (f != 'ymd' && f != 'mdy' && f != 'dmy') {
            f = 'ymd';
        }
    }

    if (sp == undefined) { sp = "-"; }
    f = f.split('').join(sp);
    var y = this.getFullYear();
    var m = this.getMonth() + 1;
    var d = this.getDate();

    return f.replace(/y/, y).replace(/m/, (m < 10 ? ('0' + m) : m)).replace(/d/, (d < 10 ? ('0' + d) : d));
    //    return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
};
/**
* 删除左右两端的空格

*/
String.prototype.trim=function()
{
     return this.replace(/(^\s*)(\s*$)/g, '');
};
/**
* 删除左边的空格

*/
String.prototype.ltrim=function()
{
     return this.replace(/(^\s*)/g,'');
};
/**
* 删除右边的空格

*/
String.prototype.rtrim=function()
{
     return this.replace(/(\s*$)/g,'');
};
String.prototype.right = function(lngLen) {
    if (this.length - lngLen >= 0 && this.length >= 0 && this.length - lngLen <= this.length) {
        return this.substring(this.length - lngLen, this.length);
    }
    else { return null;
    }
};
String.prototype.left = function(lngLen) {
    if (lngLen > 0) { return this.substring(0, lngLen);
    }
    else { return null;
    }
}; 


