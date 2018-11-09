let Mock = require('mockjs')

module.exports = function (app) {
	// 上传文件 接口
	app.post('/file/upload', function (req, res) {
	  let data = Mock.mock({
	    'code': 'PL000001',
	    'success': true,
	    'msg': '网络加载失败，请刷新后重试！'
	  })
	  res.send(data)
	})
}
