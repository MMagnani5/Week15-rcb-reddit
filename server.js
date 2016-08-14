var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');


var Posts = require('./models')['Posts'];
Posts.sync();


var app = express();

app.use(express.static(__dirname,  + '/public'));

app.use(bodyParser.urlencoded({
  extended: false
}));

app.engine('handlebars', handlebars({
  defualtLayout: 'main'
}));

app.set('view engine', 'handlebars');

//home page
app.get('/', function(req, res){
    
  Posts.findAll({}).then(function(result){
    console.log(result);
    return res.render('index', {
      post: result
    });

  });
    

})

// form page
app.get('/new-post', function(req, res){
    res.render('new');
})

app.get('/posts/:id', function(req, res){
    res.render('post');
})




var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('connection running')
});
