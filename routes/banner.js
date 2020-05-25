const express = require('express')
const router = express.Router()
const Banner = require('../controller/v1/banner')

/**
 * @url /banner/1
 * @query id 
 */
router.get('/', Banner.getBanners)


module.exports = router