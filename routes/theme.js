const express = require('express')
const router = express.Router()
const Theme = require('../controller/v1/theme')
const loginCheck = require('../middleware/loginCheck')
const superAdminCheck = require('../middleware/superAdminCheck')

/**
 * 请求所有专题
 * @url /theme
 */
router.get('/', Theme.getAll)

/**
 * 请求指定id对应的专题
 * @url /theme/detail?id=1
 * @query id
 */
router.get('/detail', Theme.getOne)

/**
 * 添加专题
 * @url /theme/add
 */
router.post('/add', loginCheck, Theme.add)

/**
 * 修改专题信息
 * @url /theme/update
 */
router.post('/update', loginCheck, Theme.update)

/**
 * 删除专题
 * @url /theme/delete
 */
router.post('/delete', superAdminCheck, Theme.delete)


module.exports = router