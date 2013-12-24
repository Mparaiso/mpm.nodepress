Development Notes(in french,sorry)
==================================

@note @node @express

####Links:
+   Lorem Ipsum,fake text : http://www.loremipsum.net/
####MongoDB
+   Orderby : http://docs.mongodb.org/manual/reference/operator/meta/orderby/
####Packages used:
+ lorem :  https://github.com/shyiko/lorem
    <code>
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
    </code>
