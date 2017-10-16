var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();//启动express

var router = express.Router();

router.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(router);

// 定义数据的读取
var appData = require('./data.json');
var seller = appData.seller;
var goods = appData.goods;
var ratings = appData.ratings;
// 定义路由
var apiRoutes = express.Router();
apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,// 标识：数据正常
    data: seller //seller:seller
  });
});
apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});
apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});
app.use('/api', apiRoutes);


app.use(express.static('./dist'));


var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
