
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , flash = require('connect-flash') //@note @express flash messages
  , mongoose = require('mongoose')
  , container = require('./container');

var app = express();
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
//@note @express configure flash messages
app.use(express.cookieParser('my super cookie'));
app.use(express.session({cookie:{maxAge:50000}}));
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.locals(container.locals);
// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.use('/post', routes);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
