var async = require('async');
var express = require('express');
var container = require('../container')
    , Post = container.db.models.Post
    , PostForm = container.forms.PostForm;

app = express();
app.locals(container.locals);

app.param('post', function (req, res, next, id) {
    console.log(id);
    Post.findById(id, function (err, post) {
        if (err)return next(err);
        if (post) {
            req.post = post;
            return next();
        }
        return next(new Error('failed to load post with id ' + id));
    })
});
// list posts
app.get('/', function (req, res) {
    async.series({posts: Post.find.bind(Post, {$query: {}, $orderby: {postDate: -1}})},
        function (err, result) {
            res.render('index', {posts: result.posts});
        });
});
// create post
app.all('/create', function (req, res) {
    var post = new Post(container.post_model_defaults);
    var postForm = new PostForm(post);
    if (req.method === "POST") {
        postForm.bind(req.body);
        return async.series([
                postForm.validate.bind(postForm),
                post.validate.bind(post),
                post.save.bind(post)],
            function (err, result) {
                console.log(err);
                if (err)return res.render('post/create', {post: post, form: postForm,error:err});
                req.flash('success', 'Post has been created');
                return res.redirect(result[2][0].get('id'));
            });
    } else {
        return res.render('post/create', {post: post, form: postForm});
    }
});
// update post
app.all('/update/:post', function (req, res) {
    var post = req.post,postForm=new PostForm(post);
    if ("POST" === req.method) {
        postForm.bind(req.body);
        async.series([
            postForm.validate.bind(postForm),
            post.validate.bind(post),
            post.save.bind(post)], function (err, result) {
            if (err) {
                res.render('post/update', {form:postForm,error: err, post: post});
            } else {
                req.flash('success', 'Post has been updated');
                res.redirect(result[2][0].get('id'));
            }
        });
    } else {
        res.render('post/update', {post: post,form:postForm});
    }
});
// delete post
app.delete('/delete/:post', function (req, res) {
    var post = req.post;
    if (post) {
        async.series([post.remove.bind(post)], function (err, result) {
            if (err) {
                req.flash('error', "Error deleting post with id: " + req.params.post + ".");
            } else {
                req.flash('success', "Post with id: " + req.params.post + " removed.");
            }
            res.redirect('');
        });
    }
});
// read post
app.get('/:post', function (req, res) {
    var post = req.post;
    console.log(post);
    return res.render('post/read', {post: post});
});
module.exports = app;