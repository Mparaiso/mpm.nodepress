/*global db*/
var schema = exports;
var mongoose = require('mongoose');
schema.PostMeta=mongoose.Schema({
    metaKey:{type:String,required:true},
    metaValue:{type:mongoose.Schema.Types.Mixed,required:true}
});
schema.PostSchema = mongoose.Schema({
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
    postMetas: [schema.PostMeta]
});

schema.UserSchema = mongoose.Schema({
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
schema.CommentSchema = mongoose.Schema({
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
schema.OptionSchema = mongoose.Schema({
    blogId: Number,
    optionName: String,
    optionValue: String,
    autoload: Boolean
});

//db.model('Article',ArticleSchema);

