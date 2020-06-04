const jwt = require('jsonwebtoken')
const secret = 'vendor'

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      res.status(401).json({
        errcode: 10002,
        msg: '未检测到登录信息'
      })
    } else {
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          res.status(402).json({
            errcode: 10002,
            msg: '登录已过期，请重新登录'
          })
        } else {
          next()
        }
      })
    }   
  } catch (error) {
    next(error)
  }
}

