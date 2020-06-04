const express = require('express')
const router = express.Router()
const Product = require('../controller/v1/product')
const loginCheck = require('../middleware/loginCheck')
const superAdminCheck = require('../middleware/superAdminCheck')

/**
 * 获取商品列表
 * @url /product?page=1&limit=10
 * @query page请求的页数 limit每页请求的数量
 */
router.get('/', Product.getAll)

/**
 * 获取指定id的商品信息
 * @url /product/detail?id=1
 * @query id
 */
router.get('/detail', Product.getOne)

/**
 * 获取指定数量的商品列表，并按时间倒序
 * @url /product?page=1&limit=5
 * @query page请求的页数 limit每页请求的数量
 */
router.get('/new', Product.getNewList)

/**
 * 添加商品
 * @url /product/add
 */
router.post('/add', loginCheck, Product.add)

/**
 * 修改商品信息
 * @url /product/update
 * @param id
 */
router.post('/update', loginCheck, Product.update)

/**
 * 删除商品(软删除)
 * @url /product/delete
 * @param id
 */
router.post('/delete', superAdminCheck, Product.delete)

module.exports = router