const moment = require('moment')
const jwt = require('jsonwebtoken')
const secret = 'vendor'
const models = require('../../db/models')
const AdminModel = models.admin

function generateToken (payload) {
  const token = jwt.sign({
    payload // payload
    },  
    secret, // 设置用于加密的key 
    { 
      expiresIn: '1h' // 过期时间
    })
  return token
}

class Admin {
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      const token = generateToken({ username, password })
      const admin = await AdminModel.findOne({
        where: {
          username
        }
      })
      if (admin && admin.password !== password) {
        // 密码不正确
        res.json({
          errcode: 90001,
          msg: '密码不正确'
        })
      } else if (admin && admin.password === password){
        // 登录成功
        res.json({
          errcode: 0,
          msg: '登录成功',
          token
        })
      } else {
        // 没登录过，直接注册新用户
        const user = await AdminModel.create({
          username,
          password,
          create_time: new Date()
        })
        res.json({
          errcode: 0,
          msg: '登录成功',
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
  async countAdmin(req, res, next) {
    try {
      const { date } = req.query
      const admins = await AdminModel.findAll()
      if (!date) {
        res.json({
          errcode: 0,
          msg: '查询成功',
          count: admins.length
        })
      } else {
        // 查询指定日期注册的管理员总数
        const count = admins.filter(item => moment(item.create_time).format('YYYY-MM-DD') === date).length
        res.json({
          errcode: 0,
          msg: '查询成功',
          count
        })
      }
    } catch (error) {
      next(error)
    }
  }
  async getRecent(req, res, next) {
    try {
      const { dateArr } = req.query
      const admins = await AdminModel.findAll()
      let countArr = [] 
      dateArr.forEach(date => {
        const count = admins.filter(item => moment(item.create_time).format('YYYY-MM-DD') === date).length
        countArr.push(count)
      })
      res.json({
        errcode: 0,
        msg: '查询成功',
        countArr
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Admin()
