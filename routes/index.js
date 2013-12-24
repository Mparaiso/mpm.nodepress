var async = require('async');
var express = require('express');
var container = require('../container')
    , Post=container.db.models.Post;

app = express();
app.locals(container.locals);

app.param('post',function(req,res,next,id){
    Post.findOne(id,function(err,post){
        if(err)return next(err);
        if(post){req.post=post;return next();}
        return next(new Error('failed to load post with id '+id));
    })
});
app.get('/',function(req,res){
    async.series({posts:Post.find.bind(Post)},function(err,result){
        res.render('index',{posts:result.posts});
    });
});
app.all('/create',function(req,res){
    var post = new Post;
    if(req.method==="POST"){
        post.set(req.body);
        return async.series({
            validation:post.validate.bind(post),
            posts:post.save.bind(post)},
            function(err,result){
                console.log(err);
                if(err)return res.render('post/create', {post: post,errors:err});
                req.flash('success','Post has been created');
                return res.redirect(result.posts[0].get('id'));
            });
    }else{
        return res.render('post/create', {post: post});
    }
});
app.get('/:post',function(req,res){
    console.log(req.post);
    return res.render('post/read',{post:req.post});
});
module.exports=app;