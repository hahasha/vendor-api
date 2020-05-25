const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//设置跨域访问  
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
  //   res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const imageRouter = require('./routes/image')
const themeRouter = require('./routes/theme')
const bannerRouter = require('./routes/banner')

// for parsing application/json
app.use(express.json())

// for parsing application/xxwww-form-urlencoded
app.use(express.urlencoded())

// for parsing application/xxwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// 托管静态资源
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/v1/admin', adminRouter)
app.use('/v1/product', productRouter)
app.use('/v1/category', categoryRouter)
app.use('/v1/image', imageRouter)
app.use('/v1/theme', themeRouter)
app.use('/v1/banner', bannerRouter)

app.use((err, req, res, next) => {
  if(err) {
    res.status(500).json({
      message: err.message
    })
  }
})

app.listen(3000, () => {
  console.log('服务启动成功')
})

module.exports = app;
