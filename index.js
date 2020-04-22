var express = require('express');
var app = express();
var router = require('./router/main')(app);

/*
app.get('/', (req, res) => {
    res.send("Simple API Server")
})

app.get('/pop/cards/:cardNo', (req, res) => {
    res.send("0|1|2|3|4|5|6")
})

app.get('/pop/users/:userId', (req, res) => {
    result = {
        "userId": req.params.userId
    }
    res.send(result)
})
*/

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));


console.log("Simple API Gateway run on localhost:8080")

app.listen(8080);