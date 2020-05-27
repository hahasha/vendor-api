const models = require('../../db/models')
const ThemeModel = models.theme
const ImageModel = models.image
const ProductModel = models.product
const ThemeProductModel = models.themeProduct 

ThemeModel.belongsTo(ImageModel, {
  as: 'topic_img',
  foreignKey: 'topic_img_id',
  targetKey: 'id'
})
ThemeModel.belongsTo(ImageModel, {
  as: 'head_img',
  foreignKey: 'head_img_id',
  targetKey: 'id'
})
ThemeModel.belongsToMany(ProductModel, {
  through: ThemeProductModel,
  foreignKey: 'theme_id', 
  otherKey: 'product_id'
})

class Theme {
  async getAll(req, res, next) {
    try {
      let themes = await ThemeModel.findAll({
        include: [{
          model: ImageModel,
          as: 'topic_img',
          attributes: {
            exclude: ['id']
          }
        },{
          model: ImageModel,
          as: 'head_img',
          attributes: {
            exclude: ['id']
          }
        }],
        where: {
          status: 0
        },
        attributes: {
          exclude: ['status', 'topic_img_id', 'head_img_id']
        }
      })
      res.json({
        errcode: 0,
        msg: '请求成功',
        themes
      })
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.query
      let theme = await ThemeModel.findOne({
        include:[{
          as: 'head_img',
          model: ImageModel,
          attributes: {
            exclude: ['id']
          }
        },{
          model: ProductModel,
          attributes: {
            exclude: ['status','']
          }
        }],
        where: {
          id,
          status: 0
        },
        attributes: {
          exclude: ['status', 'topic_img_id', 'head_img_id']
        }
      })
      if(!theme) {
        res.json({
          errcode: 30000,
          msg: '专题不存在，请检查id'
        })
      } else {
        res.json({
          errcode: 0,
          msg: '请求成功',
          theme
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async add(req, res, next) {
    let { name, description, topic_img_id, head_img_id } = req.body
    try {
      let theme = await ThemeModel.create({
        name,
        description,
        topic_img_id,
        head_img_id
      })
      res.json({
        errcode: 0,
        msg: '添加成功',
        theme
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, description, topic_img_id, head_img_id } = req.body
      let theme = await ThemeModel.findOne({
        where: {
          id,
          status: 0
        }
      })
      if(!theme) {
        res.json({
          errcode: 30000,
          msg: '专题不存在，请检查id'
        })
      } else {
        theme = await theme.update({
          name, 
          description, 
          topic_img_id, 
          head_img_id
        })
        res.json({
          errcode: 0,
          msg: '修改成功'
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body
      let theme = await ThemeModel.findOne({
        where: {
          id,
          status: 0  
        }
      })
      console.log(theme)
      if(!theme) {
        res.json({
          errcode: 30000,
          msg: '专题不存在，请检查id'
        })
      } else {
        theme = await theme.update({
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
}

module.exports = new Theme()