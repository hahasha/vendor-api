'use strict'

const express = require('express');
const router = express.Router();
const Admin = require('../controller/v1/admin')


// 管理员登录
router.post('/login', Admin.login)

// 管理员退出登录
// router.get('/logout', Admin.logout)


module.exports = router
