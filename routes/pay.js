const express = require('express');
const router = express.Router();
const Pay = require('../controller/v1/pay')

/**
 * 处理支付宝异步回调通知
 * @url /v1/pay/back
 */
router.post('/back', Pay.payBack)

/**
 * 生成支付页面链接
 * @url /v1/pay
 * @params  body订单描述、subject订单标题、outTradeId订单号、amount订单总价
*/
router.post('/', Pay.create)

module.exports = router
