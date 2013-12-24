var async = require('async');
var express = require('express');
var container = require('../container')
    , Post=container.db.models.Post;

app = express();
app.locals(container.locals);

app.param('post',function(req,res,next,id){
    console.log(id);
    Post.findById(id,function(err,post){
        if(err)return next(err);
        if(post){req.post=post;return next();}
        return next(new Error('failed to load post with id '+id));
    })
});
// list posts
app.get('/',function(req,res){
    async.series({posts:Post.find.bind(Post,{$query:{},$orderby:{postDate:-1}})},
        function(err,result){
        res.render('index',{posts:result.posts});
    });
});
// create post
app.all('/create',function(req,res){
    var post = new Post;
    post.set(container.post_model_defaults);
    if(req.method==="POST"){
        post.set(req.body);
        return async.series({
                validation:post.validate.bind(post),
                posts:post.save.bind(post)},
            function(err,result){
                console.log(err);
                if(err)return res.render('post/create', {post: post,error:err});
                req.flash('success','Post has been created');
                return res.redirect(result.posts[0].get('id'));
            });
    }else{
        return res.render('post/create', {post: post});
    }
});
// update post
app.all('/update/:post',function(req,res){
    var post=req.post;
    console.log(post);
    if("POST"===req.method){
        post.set(req.body);
        async.series([post.validate.bind(post),post.save.bind(post)],function(err,result){
            if(err){
                console.log(err);
                res.render('post/update',{error:err,post:post});
            }else{
                req.flash('success','Post has been updated');
                res.redirect(result[1][0].get('id'));
            }
        });
    }else{
        res.render('post/update',{post:post});
    }
});
// delete post
app.delete('/delete/:post',function(req,res){
    var post=req.post;
    if(post){
        async.series([post.remove.bind(post)],function(err,result){
            if(err){
                req.flash('error',"Error deleting post with id: "+req.params.post+".");
            }else{
                req.flash('success',"Post with id: "+req.params.post+" removed.");
            }
            res.redirect('..');
        });
    }
});
// read post
app.get('/:post',function(req,res){
    var post=req.post;
    console.log(post);
    return res.render('post/read',{post:post});
});
module.exports=app;