'use strict'

const express = require('express');
const router = express.Router();
const Admin = require('../controller/v1/admin')

/**
 * 管理员登录
 * @url /v1/admin/login
 */
router.post('/login', Admin.login)

/**
 * 统计管理员总数
 * @url /v1/admin/count
 */
router.get('/count', Admin.countAdmin)

/**
 * 获取最近的订单数据
 * @url /v1/admin/recent?dateArr=['2020-06-01', '2020-06-02']
 * @query dateArr 
 */
router.get('/recent', Admin.getRecent)


// 管理员退出登录
// router.get('/logout', Admin.logout)

module.exports = router
