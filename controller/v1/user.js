const Jwt = require('../../public/js/token')
const models = require('../../db/models')
const UserModel = models.user
const UserAddressModel = models.userAddress


class User{
  async login (req, res, next) {
    try {
      const { username, password } = req.body
      const jwt = new Jwt({ username, password })
      const token = jwt.generateToken() // 生成token
      const user = await UserModel.findOne({
        where: {
          username
        }
      })
      if (user && user.password !== password) {
        // 密码不正确
        res.json({
          errcode: 60000,
          msg: '密码不正确'
        })
      } else if (user && user.password === password){
        // 登录成功
        res.json({
          errcode: 0,
          msg: '登录成功',
          token,
          userInfo: {
            id: user.id,
            username: user.username,
            avatar: user.avatar
          }
        })
      } else {
        // 没登录过，直接注册新用户
        const user = await UserModel.create({
          username,
          password
        })
        res.json({
          errcode: 0,
          msg: '登录成功',
          token,
          userInfo: {
            id: user.id,
            username: user.username,
            avatar: user.avatar
          }
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async getAddress (req, res, next) {
    try {
      const { id } = req.query
      const addresses = await UserAddressModel.findAll({
        where: {
          user_id: id,
          status: 0
        },
        attributes: {
          exclude: ['status']
        }
      })
      if (addresses) {
        addresses.forEach(item => { // 用于选择是否默认的swith判断
          if (item.is_default === 1) {
            item.is_default = true
          } else {
            item.is_default = false
          }
        })
        res.json({
          errcode: 0,
          msg: '查询成功',
          addresses
        })
      } else {
        res.json({
          errcode: 60001,
          msg: '用户地址不存在'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async getDefault (req, res, next) {
    try {
      const { id } = req.query
      const address = await UserAddressModel.findOne({
        where: {
          user_id: id,
          status: 0,
          is_default: 1
        }
      })
      res.json({
        errcode: 0,
        msg: '查询成功',
        address
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteAddress (req, res, next) {
    try {
      const { id } = req.body
      let address = await UserAddressModel.findOne({
        where: {
          id,
          status: 0
        }
      })
      if (!address) {
        res.json({
          errcode: 60001,
          msg: '用户地址不存在'
        })
      } else {
        await address.update({
          status: 1
        })
        res.json({
          errcode: 0,
          msg: '删除成功'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async updateAddress (req, res, next) {
    try {
      const { id, name, mobile, province, city, country, detail, label, user_id, is_default } = req.body
      const address = await UserAddressModel.findOne({
        where: {
          id
        }
      })
      if (!address) {
        res.json({
          errcode: 60001,
          msg: '用户地址不存在'
        })
      } else {
        if (is_default === 'true') { // 将用户所有is_default置为0（即非默认）
          await UserAddressModel.update({ is_default: 0 }, { where: { user_id }})
        }
        const updatedAddress = await address.update({
          name, 
          mobile, 
          province, 
          city, 
          country, 
          detail, 
          label,
          is_default: is_default === 'true' ? 1 : 0
        })
        if (updatedAddress) {
          res.json({
            errcode: 0,
            msg: '地址修改成功',
            updatedAddress
          })
        }
      }
    } catch (error) {
      next(error)
    }
  }

  async addAddress (req, res, next) {
    try {
      const { name, mobile, province, city, country, detail, label, user_id, is_default } = req.body
      if (is_default === 'true') {
        await UserAddressModel.update({ is_default: 0 }, { where: { user_id }})
      }
      const address = await UserAddressModel.create({
        name,
        mobile,
        province,
        city,
        country,
        detail,
        user_id,
        is_default: is_default === 'true' ? 1 : 0,
        label
      })
      res.json({
        errcode: 0,
        msg: '新增地址成功'
      })
    } catch (error) {
      next(error)
    }
  }

  async resetPassword (req, res, next) {
    try {
      const { id, password, newPassword } = req.body
      const user = await UserModel.findOne({
        where: {
          id
        }
      })
      if (!user) {
        res.json({
          errcode: 60000,
          msg: '用户不存在'
        })
      } else {
        if (user.password === password) {
          await user.update({
            password: newPassword
          })
          res.json({
            errcode: 0,
            msg: '重置密码成功'
          })
        } else {
          res.json({
            errcode: 60000,
            msg: '密码不正确'
          })
        }
      }
    } catch (error) {
      next(error)
    }
  }

  async updateUserInfo (req, res, next) {
    try {
      const { id, username, avatar } = req.body
      const user = await UserModel.findOne({
        where: {
          id
        }
      })
      if (!user) {
        res.json({
          errcode: 60000,
          msg: '用户不存在'
        })
      } else {
        const userInfo = await user.update({
          username,
          avatar
        })
        res.json({
          errcode: 0,
          msg: '修改成功',
          userInfo
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new User()