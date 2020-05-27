const express = require('express')
const router = express.Router()
const User = require('../controller/v1/user')

/**
 * @url /v1/user/login
 * @params username, password
 */
router.post('/login', User.login)

/**
 * @url /v1/user/address
 * @query id 获取该id用户下的所有地址
 */
router.get('/address', User.getAddress)

/**
 * @url /v1/user/address/default
 * @query id 获取该id用户下的默认地址
 */
router.get('/address/default', User.getDefault)

/**
 * @url /v1/user/address/delete
 * @params id
 */
router.post('/address/delete', User.deleteAddress)

/**
 * @url /v1/user/address/update
 */
router.post('/address/update', User.updateAddress)

/**
 * @url /v1/user/address/add
 */
router.post('/address/add', User.addAddress)

/**
 * 重置密码
 * @url /v1/user/resetPassword
 */
router.post('/resetPassword', User.resetPassword)

/**
 * 修改用户信息
 * @url /v1/user/update
 */
router.post('/update', User.updateUserInfo)

module.exports = router
