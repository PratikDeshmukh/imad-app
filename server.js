var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var crypto = require('crypto');
app.use(morgan('combined'));

var config = {
    user:'pratikdeshmukh13',
    database:'pratikdeshmukh13',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
};
var pool = new Pool(config);

var articleOne = {
  title:'Article One',
  heading:'Article One',
  date:'2 SEP ,2012',
  content:` <p>
                Hey this is pd
            </p>
            `
};            
function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var content = data.content;
    var date = data.date;
    var htmlTemplate = `
    <html>
        <head>
        <title> 
         ${title}
        </title>
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

app.get('/article-one', function( req, res) {
    
     
    var name = 'article-one';
    pool.query("select * from test where title=$1",[name],function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
             if(result.rows.length === 0){
                 res.status(404).send('Article not found');
             }else{
                 var articleData = result.rows[0];
                 res.send(createTemplate(articleData));
             }
        }
    });    
    //res.send(createTemplate(articleOne));
});
app.get('/test-db', function( req, res) {
    
    pool.query('SELECT * FROM tag',function(err,result){
        if(err){
            res.status(500).send(err.toString());
        }else{
            res.send(JSON.stringify(result.rows));
        }
    })
});

var counter = 0;
app.get('/counter', function( req, res) {
    counter = counter + 1;
    res.send(counter.toString());
});
var names=[];
app.get('/submit-name', function( req, res) {
    
    var name = req.query.name;
    names.push(name);
    
    res.send(JSON.stringify(names));
});


app.get('/article-two', function( req, res) {
    res.sendFile(path.join(__dirname,'article-two.html'));
    console.log('hi entere');
});

app.get('/article-three', function( req, res) {
    res.sendFile(path.join(__dirname,'article-three.html'));
    console.log('hi entere');
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
  console.log('hi entere');
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
  console.log('hi entere');
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
  console.log('hi entere');
});

function hash(input,salt){
    var hashed = crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return hashd.toString();
}

app.get('hash/:input',function(req,res){
    var hashString = hash(req.params.input,'this-is-a-string');
    res.send(hashString);
    
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
