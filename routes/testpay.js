var express = require('express');
var router = express.Router();
var path = require('path');
var Alipay = require('../lib/alipay');
var utl = require('../lib/utl');

var outTradeId = Date.now().toString();



var ali = new Alipay({
    appId: '2016102300742946',
    notifyUrl: 'http://127.0.0.1:3000/',
    returnUrl: 'http://www.baidu.com',
    rsaPrivate: path.resolve('./alipay_configs/private-key.pem'),
    rsaPublic: path.resolve('./alipay_configs/public-key.pem'),
    sandbox: true,
    signType: 'RSA2' // 'RSA2'
});

router.post('/', function(req, res, next) {
    const { body, subject, outTradeId, amount } = req.body
    const url =  ali.webPay({
        body, // 订单描述
        subject, // 订单标题
        outTradeId, // 订单号
        amount,
        timeout: '90m',
        sellerId: '',
        product_code: 'FAST_INSTANT_TRADE_PAY',
        goods_type: "1",
        // return_url:"http://www.baidu.com"
    })

    const url_API = 'https://openapi.alipaydev.com/gateway.do?' + url;
    res.json({
        errcode: 0,
        url: url_API
    })
})

router.post('/back', function(req, res, next) {
    let isSuccess = ali.signVerify(req.body);
    if (isSuccess) {
        if (tradeStatus === 'TRADE_FINISHED') {//交易状态TRADE_FINISHED的通知触发条件是商户签约的产品不支持退款功能的前提下，买家付款成功；或者，商户签约的产品支持退款功能的前提下，交易已经成功并且已经超过可退款期限。
 
        } else if (tradeStatus === 'TRADE_SUCCESS') {//状态TRADE_SUCCESS的通知触发条件是商户签约的产品支持退款功能的前提下，买家付款成功
 
        } else if (tradeStatus === 'WAIT_BUYER_PAY') {
 
        } else if (tradeStatus === 'TRADE_CLOSED') {
 
        }
        res.send('success');
    } else {
        res.send('fail');
    }
})

module.exports = router;
