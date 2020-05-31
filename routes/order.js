const express = require('express')
const router = express.Router()
const Order = require('../controller/v1/order')
const loginCheck = require('../middleware/loginCheck')

/**
 * 下单
 * @url /v1/order/place
 */
router.post('/place', loginCheck, Order.placeOrder)

/**
 * 获取订单详情
 * @url /v1/order/detail
 * @query id
 */
router.get('/detail', loginCheck, Order.getDetail)

/**
 * 获取订单列表
 * @url /v1/order
 * @params id
 */
router.get('/', loginCheck, Order.getAll)

module.exports = router