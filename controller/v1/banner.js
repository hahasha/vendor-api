const models = require('../../db/models')
const BannerModel = models.banner
const BannerItemModel = models.banner_item
const ImageModel = models.image

BannerModel.hasMany(BannerItemModel, { 
  as: 'items',
  foreignKey: 'banner_id', 
  sourceKey: 'id'
})

BannerItemModel.belongsTo(ImageModel, { 
  as: 'img',
  foreignKey: 'img_id', 
  targetKey: 'id'
})

class Banner {
  async getBanners(req, res, next) {
    try {
      const { id } = req.query
      let banners = await BannerModel.findAll({
        include: [{
          as: 'items',
          model: BannerItemModel,
          include: [{
            model: ImageModel,
            as: 'img'
          }],
          attributes: {
            exclude: ['banner_id', 'img_id']
          }
        }],
        where: {
          id
        }
      })
      if (!banners) {
        res.json({
          errcode: 40000,
          msg: 'banner不存在'
        })
      } else {
        res.json({
          errcode: 0,
          msg: '请求成功',
          banners
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Banner()