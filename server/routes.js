const Controller = require('./controller');
const multer = require('multer');
const crypto = require('crypto');

module.exports = (app, db) => {

  let controller = new Controller(db);
  let uploadStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/')
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

  let upload = multer({storage: uploadStorage});

  // 页面返回
  app.get('/', (req, res) => {
      res.sendFile(__dirname + '/views/dist/index.html')
    });

  // 获取网站列表
  app.get('/api/sites/get', controller.getSites);

  // 新增网站
  app.post('/api/sites/add', upload.single('icon'), controller.addSites);
};