/*jslint eqeq:true,node:true,es5:true,white:true,plusplus:true,nomen:true,unparam:true,devel:true,regexp:true */
/*Copyright © 2014 mparaiso <mparaiso@online.fr>. All Rights Reserved.*/
"use strict";
var http,express,app,port,$;


express=require('express');
http=require('http');
/** 
 * container
 */
var $=(function(g){
    var _protected,_cache, modules ;
    modules={};
    _protected=[];
    _cache={};
    return function $(moduleName,definition){

        if(definition !== undefined){
            if(definition instanceof Function){
                modules[moduleName]=(function(){
                    return function($){
                        if(_cache[moduleName]===undefined){
                            _cache[moduleName]=definition($);
                        }
                        return _cache[moduleName];
                    };
                }());
            }else{
                modules[moduleName]=definition;
            }
            if(_protected.indexOf(moduleName)===-1){
                Object.defineProperty($,moduleName,{get:function(){
                    return modules[moduleName] instanceof Function ? modules[moduleName]($):modules[moduleName];
                }})
                return $;
            }
        }
        if(modules[moduleName] instanceof Function){
            return modules[moduleName]($);
        }
        return modules[moduleName];
    };
}());

/** 
 * defintions 
 */
$('hw','Hello World!')
('port',process.env.PORT||3000)
("mongoose",function(){return require('mongoose');})
('PostMetaSchema',function($){
    return $.mongoose.Schema({
        metaKey:{type:String,required:true},
        metaValue:{type:$.mongoose.Schema.Types.Mixed,required:true}
    });
})
('PostMeta',function($){
    return $.mongoose.model('PostMeta',$.PostMetaSchema);
})
('PostSchema',function($){
    return $.mongoose.Schema({
        postDate: {type: Date, default: Date.now,required:true},
        postDateGmt: {type: Date, default: Date.now,required:true},
        postTitle: {type: String, required: "Title is required",unique:"Title must be unique"},
        postContent: {type: String, required: "Content is required"},
        postExcerpt: {type: String, required: "Excerpt is required"},
        postStatus: String,
        commentStatus: String,
        pingStatus: String,
        postPassword: String,
        postName: String,
        toPing: String,
        pinged: String,
        postModified: String,
        postModifiedGmt: String,
        postContentFiltered: String,
        postParent: Number,
        guid: String,
        menuOrder: Number,
        postType: String,
        postMimeType: String,
        commentCount: Number,
        postMetas: [$.PostMetaSchema]
    });
})
('Post',function($){
    return $.mongoose.model('Post',$.PostSchema);
})
('UserSchema',function($){
    return $.mongoose.Schema({
        userLogin: String,
        userPass: String,
        userNicename: String,
        userEmail: String,
        userUrl: String,
        userRegistered: Date,
        userActivationKey: String,
        userStatus: Number,
        displayName: String,
        userMeta: Object
    });
})
('User',function($){
    return $.mongoose.model('User',$.UserSchema);
})
('CommentSchema',function($){
    return $.mongoose.Schema({
        commentPostId: Number,
        commentAuthor: String,
        commentAuthorEmail: String,
        commentAuthorUrl: String,
        commentAuthorIP: String,
        commentDate: Date,
        commentDateGmt: Date,
        commentContent: String,
        commentKarma: Number,
        commentApproved: Boolean,
        commentAgent: String,
        commentType: String,
        commentParent: Number,
        userId: Number
    });
})
('Comment',function($){
    return $.mongoose('Comment',$.CommentSchema);
})
('OptionSchema',function($){
    return $.mongoose.Schema({
        blogId: Number,
        optionName: String,
        optionValue: String,
        autoload: Boolean
    });
})
('Option',function($){
    $.mongoose.model('Option',$.OptionSchema);
})
('app',function($){
    app = express();
    app.get('/',function(req,res){
        res.send($('hw'));
    });
    return app;
});

//export or start
if(!module.parent){
    http.createServer($('app')).listen($('port'),function(){
        console.log('listening on port:'+$('port'));
    });
}else{
    module.exports=$;
}
