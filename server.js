var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = { 
'article-One' : {
  title:'Article 
  One',
  heading:'Article One',
  date:'2 SEP ,2012',
  content: `            <p>
                  Shivaji Bhonsle (Marathi [ʃiʋaˑɟiˑ bʱoˑs(ə)leˑ]; c. 1627/1630[1] – 3 April 1680) was an Indian warrior king and a member of the Bhonsle Maratha clan. Shivaji carved out an enclave from the declining Adilshahi sultanate of Bijapur that formed the genesis of the Maratha Empire. In 1674, he was formally crowned as the Chhatrapati (Monarch) of his realm at Raigad.  
                <p>    
                <p>
                   Shivaji established a competent and progressive civil rule with the help of a disciplined military and well-structured administrative organisations. He innovated military tactics, pioneering unconventional methods which leveraged strategic factors like geography, speed, and surprise and focused pinpoint attacks to defeat his larger and more powerful enemies. He revived ancient Hindu political traditions and court conventions and promoted the usage of Marathi and Sanskrit, rather than Persian, in court and administration. 
                </p>    
    
    `
},
'article-Two' : {
  title:'Article Two',
  heading:'Article Two',
  date:'2 NOV ,2012',
  content: `            <p>
                  Shivaji Bhonsle (Marathi [ʃiʋaˑɟiˑ bʱoˑs(ə)leˑ]; c. 1627/1630[1] – 3 April 1680) was an Indian warrior king and a member of the Bhonsle Maratha clan. Shivaji carved out an enclave from the declining Adilshahi sultanate of Bijapur that formed the genesis of the Maratha Empire. In 1674, he was formally crowned as the Chhatrapati (Monarch) of his realm at Raigad.  
                <p>    
                <p>
                   Shivaji established a competent and progressive civil rule with the help of a disciplined military and well-structured administrative organisations. He innovated military tactics, pioneering unconventional methods which leveraged strategic factors like geography, speed, and surprise and focused pinpoint attacks to defeat his larger and more powerful enemies. He revived ancient Hindu political traditions and court conventions and promoted the usage of Marathi and Sanskrit, rather than Persian, in court and administration. 
                </p>    
    
    `
},
'article-Three': {
    title:'Article Three',
  heading:'Article Three',
  date:'13 AUG ,2012',
  content: `   
                <p>
                   Shivaji established a competent and progressive civil rule with the help of a disciplined military and well-structured administrative organisations. He innovated military tactics, pioneering unconventional methods which leveraged strategic factors like geography, speed, and surprise and focused pinpoint attacks to defeat his larger and more powerful enemies. He revived ancient Hindu political traditions and court conventions and promoted the usage of Marathi and Sanskrit, rather than Persian, in court and administration. 
                </p>    
    
    `
}
};
function createTemplate(data){
    //var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var date = data.date;
    var htmlTemplate = `
    <html>
        <head>
        <link href="/ui/style.css" rel="stylesheet" />
        
        </head>
        
        
        <body>
            <div>
                <a href="/">Home</a>
            </div>
            <hr/>
            <h3>
              ${heading}  
            </h3>
            <hr/>
            
            <div>
                ${date} 
            </div>    
           <div class="container"> 
                <div>
                    ${content}
                </div>
             </div>  
        </body>    
        
    </html>
    
    
    
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function( req, res) {
    //articleName= article-one;
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
