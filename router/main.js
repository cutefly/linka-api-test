var bodyParser = require('body-parser');
const axios = require('axios');

module.exports = function(app)
{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    app.get('/',function(req,res){
        res.render('index.html')
    });

     app.get('/linka',function(req,res){
        var token = '';
        var orderNo = new Date().getTime();;

        axios({
            url: 'https://dev-linka.alphapay.co.kr/v1/auth/dapp/token',
            method: 'get',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'partner-id': 'KRLW2003201605',
                'lcns-key': 'rtv79XnB7j9ZGmDDgELULMddMAkuyRTSUWDfyNCD'
            }
        })
        .then(function(response) {
            console.log(response);
            token = response.data.data;
            console.log('token: %s',  JSON.stringify(token));

            res.render('linka', {
                action_url: 'https://dev-linka.alphapay.co.kr/v1/dapp/web/pg/request',
                token: token,
                partner_id: 'KRLW2003201605',
                partner_order_id: orderNo,
                base_url: 'http://cb0d4ebb.ngrok.io'
            });
        });

    });

    app.post('/next',function(req,res){
        console.log('next : ' + req.body);
        res.render('next')
     });
     
     app.post('/callback',function(req,res){
        console.log('callback : ' + JSON.stringify(req.body, null, 2));
        res.send('OK')
     });
}