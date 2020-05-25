const models = require('../../db/models')
const ProductModel = models.product
const CategoryModel = models.category
const ImageModel = models.image
const ThemeModel = models.theme
const ThemeProductModel = models.themeProduct
const ProductPropertyModel = models.productProperty
const ProductImageModel = models.productImage
const db = require('../../db/models/index')
const Op = db.Sequelize.Op
const PAGE_SIZE = 10
const CURRENT_PAGE = 1

ProductModel.belongsTo(CategoryModel, { 
  foreignKey: 'category_id', 
  targetKey: 'id'
})
ProductModel.belongsToMany(ThemeModel, { 
  through: ThemeProductModel, 
  // as, 
  foreignKey: 'product_id', 
  otherKey: 'theme_id'
})
ProductModel.hasMany(ProductPropertyModel, { 
  as: 'properties',
  foreignKey: 'product_id', 
  sourceKey: 'id'
})
ProductModel.belongsToMany(ImageModel, { 
  through: {
    model: ProductImageModel,
  }, 
  as: 'details',
  foreignKey: 'product_id', 
  otherKey: 'img_id'
})

class Product {
  async getAll(req, res, next) {
    const page = req.query.page || CURRENT_PAGE
    const limit = req.query.limit || PAGE_SIZE
    try {
      let products = await ProductModel.findAndCountAll({
        include:[{
          model: CategoryModel,
          attributes: {
            exclude: ['head_img_id', 'status', 'description']
          }
        }, {
          model: ThemeModel,
          attributes: {
            exclude: ['topic_img_id', 'head_img_id']
          },
          through: { attributes: [] }  // 隐藏中间表
        }, {
          model: ProductPropertyModel,
          as: 'properties',
          attributes: {
            exclude: ['product_id', 'id']
          }
        }, {
          model: ImageModel,
          as: 'details',
          through: {
            as: 'orderBy',
            attributes: {
             exclude: ['product_id', 'img_id']
           },
           order: [
             ['order']
           ],
           where: {
             order: {
              [Op.gt]: 0
             }
           } 
          }
        }],
        where: {
          status: 0
        },
        limit: limit - 0,
        offset: (page - 1) * limit,
        attributes: {
          exclude: ['status']
        },
        distinct: true, // 让使用了关联查询的count计算得到正确结果
        order: [
          ['id']
        ]
      })
      res.json({
        errcode: 0,
        msg: '请求成功',
        products
      })
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.query
      let product = await ProductModel.findOne({
        include: [{
          as: 'details',
          model: ImageModel,
          through: {
            attributes: {
             exclude: ['product_id', 'img_id']
           },
           where: {
             order: {
              [Op.gt]: 0
             }
           }
          }
        }, {
          as: 'properties',
          model: ProductPropertyModel,
          attributes: {
            exclude: ['product_id']
          }
        }],
        where: {
          id,
          status: 0
        },
        attributes: {
          exclude: ['status', 'img_id', 'category_id']
        }
      })
      if(!product) {
        res.json({
          errcode: 20000,
          msg: '商品不存在,请检查id'
        })
      } else {
        // details按order排序
        function compareFn (key) {
          return function (obj1, obj2) {
            const value1 = obj1.productImage[key]
            const value2 = obj2.productImage[key]
            return value1 - value2
          }
        }
        product.details = product.details.sort(compareFn('order'))
        res.json({
          errcode: 0,
          msg: '请求成功',
          product
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async getNewList(req, res, next) {
    try {
        const page = req.query.page || CURRENT_PAGE
        const limit = req.query.limit || PAGE_SIZE
        let products = await ProductModel.findAndCountAll({
          where: {
            status: 0
          },
        order: [
          ['create_time', 'DESC']
        ],
        limit: limit - 0,
        offset: (page - 1) * limit,
        attributes: {
          exclude: ['status', 'img_id', 'category_id', 'summary']
        }
      })
      if (!products) {
        res.json({
          errcode: 20000,
          msg: '商品不存在'
        })
      } else {
        res.json({
          errcode: 0,
          msg: '请求成功',
          products
        })
      }  
    } catch (error) {
      next(error)
    }
  }

  async add(req, res, next) {
    try {
      const { name, price, stock, category_id, main_img_url, create_time, summary, img_id, themeList, imgList } = req.body
      let product = await ProductModel.create({
        name, 
        price, 
        stock, 
        category_id, 
        main_img_url,
        create_time: new Date().getTime(),
        summary,
        img_id
      })
      console.log(product)
      // 插入主题（theme_product）
      if (themeList) {
        const themes = await ThemeModel.findAll()
        let addList = []
        themes.forEach(theme => {
          themeList.forEach(item => {
            if (item == theme.name) {
              addList.push({
                product_id: product.id,
                theme_id: theme.id
              })
            }
          })
        })
        await ThemeProductModel.bulkCreate(addList, {
          updateOnDuplicate: ['theme_id', 'product_id']
        }) 
      }
      // 插入详情图（product_image）
      if (imgList) {
        const addList = []
        imgList.forEach(item => {
          addList.push({
            img_id: item.id,
            order: item.order,
            product_id: product.id
          })
        })
        await ProductImageModel.bulkCreate(addList, {
          updateOnDuplicate: ['img_id', 'order', 'product_id']
        })
      }
      res.json({
        errcode: 0,
        msg: '添加成功',
        product
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    try {
      const { id, price, name, stock, main_img_url, summary, img_id, category_id, themeList, imgList } = req.body
      let updateList = []
      let createList = []
      let product = await ProductModel.findOne({
        where: {
          id,
          status: 0
        }
      })
      if(!product) {
        res.json({
          errcode: 20000,
          msg: '商品不存在，请检查id'
        })
      } else {
        // 更新普通属性
        product = await product.update({
          name,
          price,
          stock,
          category_id,
          main_img_url,
          summary,
          img_id
        })
        // 更新商品专题关联表(先全删除，再新增)
        await ThemeProductModel.destroy({
          where: {
            product_id: id
          }
        })
        if (themeList) {
          let addList = []
          themeList.forEach(item => {
            const val = {
              theme_id: item.id,
              product_id: id
            }
            addList.push(val)
          })
          await ThemeProductModel.bulkCreate(addList, {
            updateOnDuplicate: ['theme_id', 'product_id']
          })
        }
        // 更新商品详情图片关联表
        if (imgList) {
          let imgs = await ProductImageModel.findAll({
            where: {
              product_id: id
            }
          })    
          // 找到匹配的img_id,且order发生改变
          imgs.forEach(img => {
            imgList.forEach(item => {
              if (item.id == img.get('img_id') && item.order != img.get('order')) {
                const val = {
                  id: img.get('id'),
                  img_id: item.id,
                  order: item.order,
                  product_id: id
                }
                updateList.push(val)
              }
            })
          })
          // 过滤不匹配img_id的list,说明是新添加的图片
          createList = imgList.filter(item => !imgs.some(img => img.get('img_id') == item.id ))
          if (createList.length > 0) {
            createList.forEach(item => {
              const val = {
                img_id: item.id,
                order: item.order,
                product_id: id
              }
              updateList.push(val)
            })
          }
          let result = await ProductImageModel.bulkCreate(updateList, {
            updateOnDuplicate: ['id', 'img_id', 'order', 'product_id']
          })
        }
        res.json({
          errcode: 0,
          msg: '修改成功',
          product
        })
      }
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.body
      let product = await ProductModel.findOne({
        where: {
          id,
          status: 0
        }
      })
      if(!product) {
        res.json({
          errcode: 20000,
          msg: '商品不存在，请检查id'
        })
      } else {
        product = product.update({
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

module.exports = new Product() 