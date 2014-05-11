Development Notes(in french,sorry)
==================================

@note @node @express

####Links:
+ Lorem Ipsum,fake text : http://www.loremipsum.net/
+ connect middlewares : https://github.com/senchalabs/connect/wiki
+ express examples : https://github.com/visionmedia/express/tree/master/examples
+ express wiki : https://github.com/visionmedia/express/wiki

####MongoDB
+   Orderby : http://docs.mongodb.org/manual/reference/operator/meta/orderby/

####Packages used:
+ supertest: https://github.com/visionmedia/supertest
+ connect-flash : https://github.com/jaredhanson/connect-flash

    <pre><code>
        var flash = require('connect-flash');
        var app = express();
        app.configure(function() {
          app.use(express.cookieParser('keyboard cat'));
          app.use(express.session({ cookie: { maxAge: 60000 }}));
          app.use(flash());
        });
        app.get('/flash', function(req, res){
          // Set a flash message by passing the key, followed by the value, to req.flash().
          req.flash('info', 'Flash is back!')
          res.redirect('/');
        });
        app.get('/', function(req, res){
          // Get an array of flash messages by passing the key to req.flash()
          res.render('index', { messages: req.flash('info') });
        });
    </code></pre>

+ lorem :  https://github.com/shyiko/lorem

    <pre><code>
        //usage:
        var lorem = require('lorem');
        var paragraphAsAString = lorem.ipsum('p');
        /*
        examples:
        lorem_p # single paragraph, same as lorem_p1
        lorem_p2 # two paragraphs
        lorem_s # single sentence, same as lorem_s1
        lorem_s3$120 # three sentences, with maximum overall length <= 120 characters
        lorem_w$5 # single word, maximum 5 characters long. same as lorem_w1$3.
        lorem_w4 # four words
        lorem_i300x100 # 300x100 image
        */
    </code></pre>
+ express-debug: https://github.com/devoidfury/express-debug

    <pre><code>
    var express = require('express');
    var app = express();

    app.configure('development', function() {
        var edt = require('express-debug');
        edt(app, {/* settings */});
    });
    </code></pre>

