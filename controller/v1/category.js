const models = require('../../db/models')
const CategoryModel = models.category
const ProductModel = models.product
const ImageModel = models.image
CategoryModel.hasMany(ProductModel, {
  sourceKey: 'id',
  foreignKey: 'category_id'
})
CategoryModel.belongsTo(ImageModel, {
  as: 'headImg',
  foreignKey: 'head_img_id',
  targetKey: 'id'
})

class Category{
  async getAll(req, res, next) {
    try {
      let categories = await CategoryModel.findAll({
        where: {
          status: 0
        },
        include: [{
          model: ImageModel,
          as: 'headImg',
        }],
        attributes: {
          exclude:['head_img_id', 'status']
        },
        order: ['id']
      })
      res.json({
        errcode: 0,
        msg: '请求成功',
        categories
      })
    } catch (error) {
      next(error)
    }
  }

  async getDetail(req, res, next) {
    try {
      let categories = await CategoryModel.findAll({
        where: {
          status: 0
        },
        include: [{
          model: ProductModel,
          where: {
            status: 0
          },
          attributes: {
            exclude: ['status', 'category_id', 'img_id', 'summary']
          }
        },{
          model: ImageModel,
          as: 'headImg',
        }],
        attributes: {
          exclude:['head_img_id', 'status']
        },
        order: ['id']
      })
      res.json({
        errcode: 0,
        msg: '请求成功',
        categories
      })
    } catch (error) {
      next(error)
    }
  }

  async add(req, res, next) {
    try {
      const { name, head_img_id, description } = req.body
      let category = await CategoryModel.create({
        name, 
        head_img_id, 
        description
      }) 
      res.json({
        errcode: 0,
        msg: '添加成功',
        category
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id, name, description, head_img_id } = req.body
      let category = await CategoryModel.findOne({
        where: {
          id,
          status: 0
        }
      })
      if(!category) {
        res.json({
          errcode: 50000,
          msg: '分类不存在，请检查id'
        })
      } else {
        category.update({
          name,
          description,
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
      let category = await CategoryModel.findOne({
        where: {
          id,
          status: 0
        }
      })
      if(!category) {
        res.json({
          errcode: 50000,
          msg: '分类不存在'
        })
      } else {
        await category.update({
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

module.exports = new Category()