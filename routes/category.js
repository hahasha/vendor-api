const express = require('express')
const router = express.Router()
const Category = require('../controller/v1/category')
const loginCheck = require('../middleware/loginCheck')
const superAdminCheck = require('../middleware/superAdminCheck')

/**
 * 查询分类详情
 * @url /category/detail
 */
router.get('/detail', Category.getDetail)

/**
 * 添加分类
 * @url /category/add
 * @params id
 */
router.post('/add', loginCheck, Category.add)

/**
 * 修改分类信息
 * @url /category/update
 * @params id
 */
router.post('/update', loginCheck, Category.update)

/**
 * 删除分类
 * @url /category/delete
 * @params id
 */
router.post('/delete', superAdminCheck, Category.delete)

/**
 * 查询所有分类
 * @url /category
 */
router.get('/', Category.getAll)

module.exports = router