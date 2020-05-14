'use strict'

const express = require('express');
const router = express.Router();
const Admin = require('../controller/admin/admin')


// 管理员登录
router.post('/login', Admin.login)

module.exports = router
