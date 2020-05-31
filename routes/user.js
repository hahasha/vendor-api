const express = require('express')
const router = express.Router()
const User = require('../controller/v1/user')
const loginCheck = require('../middleware/loginCheck')

/**
 * @url /v1/user/login
 * @params username, password
 */
router.post('/login', User.login)

/**
 * @url /v1/user/address
 * @query id 获取该id用户下的所有地址
 */
router.get('/address', loginCheck, User.getAddress)

/**
 * @url /v1/user/address/default
 * @query id 获取该id用户下的默认地址
 */
router.get('/address/default', loginCheck, User.getDefault)

/**
 * @url /v1/user/address/delete
 * @params id
 */
router.post('/address/delete', loginCheck, User.deleteAddress)

/**
 * @url /v1/user/address/update
 */
router.post('/address/update', loginCheck, User.updateAddress)

/**
 * @url /v1/user/address/add
 */
router.post('/address/add', loginCheck, User.addAddress)

/**
 * 重置密码
 * @url /v1/user/resetPassword
 */
router.post('/resetPassword', loginCheck, User.resetPassword)

/**
 * 修改用户信息
 * @url /v1/user/update
 */
router.post('/update', loginCheck, User.updateUserInfo)

module.exports = router
