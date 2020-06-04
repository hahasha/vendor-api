const models = require('../../db/models')
const OrderModel = models.order
const path = require('path');
const Alipay = require('../../lib/alipay');
const utl = require('../../lib/utl');

const outTradeId = Date.now().toString()

const params = {
  appId: '2016102300742946',
  notifyUrl: 'http://www.liusha.ltd/api/v1/pay/back',
  // returnUrl: 'http://www.liusha.ltd/vendor/#/orderDetail',
  rsaPrivate: path.resolve('./alipay_configs/private-key.pem'),
  rsaPublic: path.resolve('./alipay_configs/public-key.pem'),
  sandbox: true,
  signType: 'RSA2' // 'RSA2'
}

class Pay {
  async create (req, res, next) {
    try {
      const { returnPath, body, subject, outTradeId, amount } = req.body
      const ali = new Alipay({
        ...params,
        returnUrl: 'http://www.liusha.ltd/vendor/' + returnPath
      })
      const url =  ali.webPay({
          body, // 订单描述
          subject, // 订单标题
          outTradeId, // 订单号
          amount,
          timeout: '90m',
          product_code: 'FAST_INSTANT_TRADE_PAY'
      })
  
      const url_API = 'https://openapi.alipaydev.com/gateway.do?' + url;
      res.json({
          errcode: 0,
          url: url_API
      })  
    } catch (error) {
      next(error)
    }
}

  async payBack (req, res, next) {
    try {
      console.log(req.body)
      const ali = new Alipay(params)
      const tradeStatus = req.body.trade_status // 交易状态
      const orderNo = req.body.out_trade_no // 商户订单号
      const gmtCreate = req.body.gmt_create // 交易创建时间
      const tradeNo = req.body.trade_no // 支付宝交易号
      const gmtPayment = req.body.gmt_payment // 交易付款时间
      const receiptAmount = req.body.receipt_amount // 实收金额：商家在交易中实际收到的金额
      const buyerPayAmount = req.body.buyer_pay_amount // 付款金额：用户在交易中支付的金额
      const result = ali.signVerify(req.body) // 验签：验证支付宝异步通知的合法性
      if (result) {
          console.log(tradeStatus)
          // TRADE_FINISHED 交易完结，不支持退款  TRADE_SUCCESS 支付成功，可退款
          if (tradeStatus === 'TRADE_FINISHED' || tradeStatus === 'TRADE_SUCCESS') { 
              // 修改订单状态
              const order = await OrderModel.findOne({
                where: {
                  order_no: orderNo
                }
              })
              if (order && order.status === 1) {
                const orderDetail = order.update({
                  gmt_create: gmtCreate,
                  trade_no: tradeNo,
                  gmt_payment: gmtPayment,
                  status: 2
                })
                res.json({
                  errcode: 0,
                  msg: '支付成功',
                  order: orderDetail
                })
              } else if (order && order.status === 2) {
                res.json({
                  errcode: 80002,
                  msg: '订单已经支付过了'
                })
              } else {
                res.json({
                  errcode: 80001,
                  msg: '订单不存在'
                })
              }
          } else if (tradeStatus === 'WAIT_BUYER_PAY') {  // 交易创建
  
          } else if (tradeStatus === 'TRADE_CLOSED') {  // 交易关闭
  
          }
          res.send('success')
      } else {
          res.send('fail')
      }  
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Pay()