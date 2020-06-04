const models = require('../db/models')
const AdminModel = models.admin
const jwt = require('jsonwebtoken')
const secret = 'vendor'

const SUPER_SCOPE = 2

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      res.status(401).json({
        errcode: 10002,
        msg: '未检测到登录信息'
      })
    } else {
      jwt.verify(token, secret, async (err, decoded) => {
        if (err) {
          res.status(402).json({
            errcode: 10002,
            msg: '登录已过期，请重新登录'
          })
        } else {
          const admin = await AdminModel.findOne({ where: { username: decoded.payload.username } })
          if (admin.status < SUPER_SCOPE) { // 判断是否有超级管理员权限
            res.status(403).json({
              errcode: 10003,
              msg: '权限不足'
            })
          }
          if (admin.status >= SUPER_SCOPE) {
            next()
          }
        }
      })
    }   
  } catch (error) {
    next(error)
  }
}

