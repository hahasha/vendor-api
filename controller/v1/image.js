const models = require('../../db/models')
const ImageModel = models.image

class Image {
  async upload(req, res, next) {
    try {
      const { filename } = req.file
      let image = await ImageModel.findOrCreate({
        where: {
          url: '/' + filename
        }
      })
      image = image[0]
      if(!image) {
        res.json({
          errcode: 10004,
          msg: '上传失败'
        })
      } else {
        res.json({
          errcode: 0,
          msg: '上传成功',
          image
        })
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new Image()