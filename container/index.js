/**
 * @type {Pimple}
 */
var container = new (require('pimple'));
//locals
container.set('locals', {
    title: "NodePress"
});
//middleware
container.set('middleware',require('./middleware'));
//connection string
container.set('db_uri', process.env.nodepress_mongodb);
//schemas
container.set('schema', function schema() {
    return require('./schema');
});
//mongoose
container.set('mongoose',container.share(function mongoose(container){
    return require('mongoose');
}));
//db
container.set('db', container.share(function db(container) {
    var db = container.mongoose.createConnection(container.db_uri);
    db.model('Post', container.schema.PostSchema);
    db.model('User', container.schema.UserSchema);
    db.model('Option', container.schema.OptionSchema);
    db.model('Comment', container.schema.CommentSchema);
    return db;
}));
container.set('post_model_defaults',{});
//forms
container.set('forms',container.share(function(){
    return require('./forms');
}));

if (process.env.NODE_ENV === "development") {
    //https://github.com/shyiko/lorem
    var lorem = require('lorem');
    container.set('mongoose',container.share(container.extend('mongoose',function mongoose(mongoose,container){
        //debug mongodb connections
        mongoose.set('debug',true);
        return mongoose;
    })));
    //random text as default
    container.set('post_model_defaults',function(){
        return {
            postTitle:lorem.ipsum('w4'),
            postExcerpt:lorem.ipsum('s'),
            postContent:lorem.ipsum('p4')
        };
    });
}

if(process.env.NODE_ENV==='testing'){
    container.set('db_uri', process.env.nodepress_mongodb_test);
}

module.exports = container;