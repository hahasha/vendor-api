'use strict'

const models = require('../../db/models')
const jwt = require('jsonwebtoken');
const sercet = "vendor";

class Admin {
  async login(req, res, next) {
    try {
      const { username, password } = req.body
      let admin = await models.admin.findOne({
        where: {
          username
        }
      })
      if (!admin) {
        res.json({
          code: 500,
          message: 'admin not found'
        })
      }
      const token = jwt.sign({
          username,
          password,
          'time': Date.now(),
        }, sercet, {expiresIn:60*60})
      res.json({
        token
      })
    } catch (error) {
      next(error)
    }
  }
  async logout(req, res, next) {

  }
}

const admin  = new Admin()

module.exports = admin
