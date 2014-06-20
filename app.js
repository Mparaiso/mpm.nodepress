/*jslint eqeq:true,node:true,es5:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
/*Copyright © 2014 mparaiso <mparaiso@online.fr>. All Rights Reserved.*/
"use strict";
var http,express,app,port,$;


express=require('express');
http=require('http');
app=express();
port=process.env.PORT||3000;
(function(g){
    var modules = {};
    g.$=function(){}
}(this));
app.get('/',function(req,res){
    res.send('Hello World');
});
//export or start
if(!module.parent){
    http.createServer(app).listen(port,function(){
        console.log('listening on port:'+port);
    })
}else{
    module.export=app;
}
