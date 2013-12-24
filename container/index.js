var Pimple = require('pimple');
/**
 * @type {Pimple}
 */
var container = new Pimple;
//locals
container.set('locals', {
    title: "NodePress"
});
//connection string
container.set('db_uri', process.env.nodepress_mongodb);
//schemas
container.set('schema', function schema() {
    return require('./schema');
});
//mongodb connection
container.set('db', container.share(function db(container) {
    var db = require('mongoose').createConnection(container.db_uri);
    db.model('Post', container.schema.PostSchema);
    db.model('User', container.schema.UserSchema);
    db.model('Option', container.schema.OptionSchema);
    db.model('Comment', container.schema.CommentSchema);
    return db;
}));

if (process.env.NODE_ENV === "development") {
    // register development configuration
}

module.exports = container;