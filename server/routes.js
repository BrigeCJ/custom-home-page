const Controller = require('./controller');
const multer = require('multer');
const crypto = require('crypto');

module.exports = (app, db) => {

  let controller = new Controller(db);
  let siteStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/sites/')
    },
    filename: function (req, file, cb) {
      let index = file.originalname.lastIndexOf('.');
      let subfix = file.originalname.substr(index);
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if( err ) throw err;
        cb(null, raw.toString('hex') + subfix)
      })
    }
  });
  let searchEnginesStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/searchEngines/')
    },
    filename: function (req, file, cb) {
      let index = file.originalname.lastIndexOf('.');
      let subfix = file.originalname.substr(index);
      crypto.pseudoRandomBytes(16, function (err, raw) {
        if( err ) throw err;
        cb(null, raw.toString('hex') + subfix)
      })
    }
  });

  let uploadSitesIcon = multer({storage: siteStorage});
  let uploadSearchEnginesLogo = multer({storage: searchEnginesStorage})

  // 页面返回
  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/views/dist/index.html')
    });

  // 获取网站列表
  app.get('/api/sites/get', controller.getSites);

  // 新增网站
  app.post('/api/sites/add', uploadSitesIcon.single('icon'), controller.addSites);

  // 获取搜索引擎的列表
  app.get('/api/searchEngines/get', controller.getSearchEngines);

  // 添加搜索引擎
  app.post('/api/searchEngines/add', uploadSearchEnginesLogo.single('logo'), controller.addSearchEngines)
};