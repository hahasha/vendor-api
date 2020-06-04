const moment = require('moment')
const models = require('../../db/models')
const OrderModel = models.order
const UserModel = models.user
const ProductModel = models.product

function getRandomNum () {
  return (new Date()).getTime() + Math.floor(Math.random() * 9 + 1) * Math.pow(10, 6)
}

class Order {
  async placeOrder (req, res, next) {
    try {
      const { user_id, total_price, total_count, snap_address, snap_items, snap_img, snap_name } = req.body
      const user = await UserModel.findOne({
        where: {
          id: user_id
        }
      })
      if (!user) {
        res.json({
          errcode: 80000,
          msg: '下单失败，用户不存在'
        })
      } else {
        let outOfStock = false
        snap_items.forEach(async item => { // 遍历检查库存
          const product = await ProductModel.findOne({
            where: {
              id: item.id
            }
          })
          if (item.count > product.stock) { 
            outOfStock = true
            return false
          }
        })
        if (outOfStock) {
          res.json({
            errcode: 80000,
            msg: '下单失败，库存不足'
          })
        } else {
          // 减库存
          snap_items.forEach(async item => {
            const product = await ProductModel.findOne({
              where: {
                id: item.id
              }
            })
            product.update({
              stock: product.stock - item.count
            })
          })
          // order_no, user_id, total_price, total_count, snap_address, snap_items, create_time, status
          const orderNo = getRandomNum() + user_id // 生成订单号(时间戳 + 6位随机数 + user_id)
          const order = await OrderModel.create({ // 保存订单信息
            order_no: orderNo,
            user_id,
            total_price,
            total_count,
            snap_address,
            snap_items,
            create_time: new Date(),
            snap_img,
            snap_name,
            status: 1
          })
          res.json({
            errcode: 0,
            msg: '下单成功, 请尽快支付',
            order
          })
        }
      }
    } catch (error) {
      next(error)
    }
  }

  async getDetail (req, res, next) {
    try {
      const { orderNo } = req.query
      const order = await OrderModel.findOne({
        where: {
          order_no: orderNo
        }
      })
      if (!order) {
        res.json({
          errcode: 80001,
          msg: '订单不存在'
        })
      } else {
        res.json({
          errcode: 0,
          msg: '查询成功',
          order
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async getAll (req, res, next) {
    try {
      const { user_id } = req.query
      const user = await UserModel.findOne({
        where: {
          id: user_id
        }
      })
      if (!user) {
        res.json({
          errcode: 60000,
          msg: '用户不存在'
        })
      } else {
        const orders = await OrderModel.findAll({
          where: {
            user_id
          }
        })
        res.json({
          errcode: 0,
          msg: '查询成功',
          orders
        })
      }
    } catch (error) {
      next(error)
    }
  }
  
  async countOrder(req, res, next) {
    try {
      const { date } = req.query
      const orders = await OrderModel.findAll()
      if (!date) {
        res.json({
          errcode: 0,
          msg: '查询成功',
          count: orders.length
        })
      } else {
        // 查询指定日期的订单数
        const count = orders.filter(item => moment(item.create_time).format('YYYY-MM-DD') === date).length
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
      const orders = await OrderModel.findAll()
      let countArr = [] 
      dateArr.forEach(date => {
        const count = orders.filter(item => moment(item.create_time).format('YYYY-MM-DD') === date).length
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
module.exports = new Order()