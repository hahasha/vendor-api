const Jwt = require('../public/js/token')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) {
      res.status(401).json({
        errcode: 10002,
        msg: '未检测到登录信息'
      })
    } else {
      const jwt = new Jwt(token)
      const result = jwt.verifyToken()
      if (result === 'expired') {
        res.status(403).json({
          errcode: 10002,
          msg: '登录已过期，请重新登录'
        })
      }
      next()
    }
  }

