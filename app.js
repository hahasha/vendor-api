const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const adminRouter = require('./routes/admin')

// for parsing application/json
app.use(express.json())

// for parsing application/xxwww-form-urlencoded
app.use(express.urlencoded())

// for parsing application/xxwww-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))


app.use('/admin', adminRouter)

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
