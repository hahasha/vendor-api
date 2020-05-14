var express = require('express');
var router = express.Router();

// router级别中间件
// 1.
function log_middleware(req, res, next) {
  console.log('log from router')
  next()
}
router.use(log_middleware)

function valid__login_middleware(req, res, next) {
  let { name, password } = req.query
  if(!name || !password) {
    res.json({
      message: '登录参数校验失败'
    })
  } else {
    // 传递参数
    req.formdata = {
      name,
      password
    }
    next()
  }
}

// 2.路由内部使用
router.get('/login', [valid__login_middleware/** valid__login_middleware */], (req, res) => {
  let { formdata } = req 
  res.json({
    message: 'login',
    formdata
  })
})

router.get('/demo', (req, res) => {
  res.json({
    message: 'router demo'
  })
})

module.exports = router;
