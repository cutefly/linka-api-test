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
            //console.log(response);
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

    app.post('/void/:id',function(req,res){
        var token = '';
        var id = req.params.id;

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
            //console.log(response);
            token = response.data.data;
            console.log('token: %s',  JSON.stringify(token));

            axios({
                url: 'https://dev-linka.alphapay.co.kr/v1/dapp/web/pg/cancel',
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                'x_access_token': token,
                'partner_id': 'KRLW2003201605',
                'partner_order_id': id
            })
            .then(function(res2) {
                console.log('result: %s', JSON.stringify(res2.data));
                if (  res2.data.code == '0000') {
                    res.ok();
                } else {
                    res.send(res2.data);
                }
            })
        })
    });

    app.get('/next/:id',function(req,res){
        var id = req.params.id;

        console.log('partner_order_id : ' + id);
        res.render('next', {
            'partner_order_id': id
        })
     });
     
     app.post('/callback',function(req,res){
        console.log('callback : ' + JSON.stringify(req.body, null, 2));
        res.send('OK')
     });
}