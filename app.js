
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash') //@note @express flash messages
  , mongoose = require('mongoose')
  , container = require('./container');

var app = express();
app.container=container;
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'jade');
//@note @express configure flash messages
//@note @express flash @see https://github.com/jaredhanson/connect-flash
app.use(express.cookieParser('my super cookie'));
app.use(express.session({cookie:{maxAge:50000}}));
app.use(flash());
// add flash messages to locals
app.use(container.middleware.flash_messages);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(container.middleware.res_locals);
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
  app.locals.pretty=true;
  var edt = require('express-debug');
  edt(app, {/* settings */});
}
//mount post routes
app.use('/post', routes.post);

// if main, run server
if(!module.parent)
    http.createServer(app).listen(app.get('port'), function(){
      console.log('Express server listening on port ' + app.get('port'));
    });
module.exports = app;
