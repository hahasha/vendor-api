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
 * 根据订单号获取订单详情
 * @url /v1/order/detail
 * @query order_no
 */
router.get('/detail', loginCheck, Order.getDetail)

/**
 * 统计指定日期的订单总数，如果没有指定日期则统计所有订单
 * @url /v1/order/count?date='2020-06-04'
 */
router.get('/count', Order.countOrder)

/**
 * 获取最近的订单数据
 * @url /v1/order/recent?dateArr=['2020-06-01', '2020-06-02']
 * @query dateArr 
 */
router.get('/recent', Order.getRecent)

/**
 * 获取订单列表
 * @url /v1/order
 * @params id
 */
router.get('/', loginCheck, Order.getAll)

module.exports = router