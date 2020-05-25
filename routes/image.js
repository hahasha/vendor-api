const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'public/images' }) // 设置图片保存的路径
const router = express.Router()
const Image = require('../controller/v1/image')

/**
 * 上传图片
 * @url /image/upload
 */
router.post('/upload', upload.single('file'), Image.upload)

module.exports = router