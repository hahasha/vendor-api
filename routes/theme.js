const express = require('express')
const router = express.Router()
const Theme = require('../controller/v1/theme')

/**
 * 请求所有专题
 * @url /theme
 */
router.get('/', Theme.getAll)

/**
 * 请求指定id对应的专题
 * @url /theme/:id
 * @params id
 */
router.get('/:id', Theme.getOne)

/**
 * 添加专题
 * @url /theme/add
 */
router.post('/add', Theme.add)

/**
 * 修改专题信息
 * @url /theme/update
 */
router.post('/update', Theme.update)

/**
 * 删除专题
 * @url /theme/delete
 */
router.post('/delete', Theme.delete)


module.exports = router