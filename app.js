const express = require('express');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

const models = require('./models') // 模型对象


app.get('/create', async (req, res) => {
  let { name } = req.query
  // create方法返回promise，user是一个sequelize对象
  let user = await models.User.create({
    name
  })
  res.json({
    message: '创建成功',
    user
  })
})

app.get('/getList', async (req, res) => {
  let userList = await models.User.findAll()
  res.json({
    userList
  })
})

app.get('/detail/:id', async (req, res) => {
  let { id } = req.params
  let user = await models.User.findOne({
    where: {
      id
    }
  })
  res.json({
    user
  })
})


app.use('/', indexRouter)
app.use('/user', userRouter)


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

module.exports = app;
