// express模拟后台返回数据
let express = require('express')
let app = express()
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authentication, Origin, Content-Type,Content-Length, Authorization, Accept,X-Requested-With, Access-Token, loginToken')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

require('./module/common.js')(app)

let server = app.listen(3000, function () {
  let host = server.address().address
  let port = server.address().port
  console.log('测试API接口已开启: http://%s:%s', host, port)
})
