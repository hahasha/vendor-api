'use strict'

const models = require('../../db/models')
const adminModel = models.admin
const jwt = require('jsonwebtoken')
const sercet = "vendor"

class Admin {
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      let admin = await adminModel.findOne({
        where: {
          username
        }
      })
      if (!admin) {
        res.json({
          errcode: 90000,
          msg: '管理员不存在'
        })
      } else {
        const token = jwt.sign({
          username,
          password,
            'time': Date.now(),
        }, sercet, { expiresIn: 60 * 60 })
        res.json({
          errcode: 0,
          msg: '请求成功',
          token
        })  
      }
    } catch (error) {
      next(error)
    }
  }
  async logout(req, res, next) {
    try {
      res.json({
        errcode: 0,
        msg: '退出成功'
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Admin()
