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
      const { user_id, total_price, total_count, snap_address, snap_items } = req.body
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
        if (snap_items.lenth > 0) {
          snap_items.forEach(async item => {
            const product = await ProductModel.findOne({
              where: {
                id: item.id
              }
            })
            if (item.count > product.stock) { // 检查库存
              outOfStock = true
              return false
            }
          })
        }
        if (outOfStock) {
          res.json({
            errcode: 80000,
            msg: '下单失败，库存不足'
          })
        } else {
        // order_no, user_id, total_price, total_count, snap_address, snap_items, create_time, status
          const orderNo = getRandomNum() + user_id // 生成订单号(时间戳 + 6位随机数 + user_id)
          const order = await OrderModel.create({ // 保存订单信息
            order_no: orderNo,
            user_id,
            total_price,
            total_count,
            snap_address,
            snap_items,
            create_time: (new Date()).getTime(),
            status: 1
          })
          res.json({
            errcode: 0,
            msg: '下单成功, 请尽快支付',
            order_id: order.id
          })
        }
      }
    } catch (error) {
      next(error)
    }
  }

  async getDetail (req, res, next) {
    try {
      const { id } = req.query
      const order = await OrderModel.findOne({
        where: {
          id
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
}

module.exports = new Order()