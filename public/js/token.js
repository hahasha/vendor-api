const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const secret = 'vendor'

class Jwt {
  constructor(data) {
    this.data = data
  }
  // 生成token
  generateToken () {
    // const secret = fs.readFileSync(path.join(__dirname, '../pem/private_key.pem')) // 私钥
    const token = jwt.sign({
      data: this.data // payload
      },  
      secret, // 设置用于加密的key 
      { 
        // algorithm: 'RS256', // 加密算法
        expiresIn: '1h' // 过期时间
      })
    return token
  }

  // 验证token
   verifyToken () {
     const token = this.data
    //  const secret = fs.readFileSync(path.join(__dirname, '../pem/public_key.pem')) // 公钥
     jwt.verify(token, secret, (err, decoded) => {
       if (err) {
         return 'expired'
       }
     })
   }
}

module.exports = Jwt