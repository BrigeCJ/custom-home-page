function controller(db) {

  let database = db.db('checkson');
  let sites = database.collection('sites');
  let searchEngines = database.collection('searchengines');
  let wallpapers = database.collection('wallpapers')

  // 获取网站列表信息
  this.getSites = (req, res) => {
    let {page, size, keyword} = req.query;
    let skip = (page - 1) * size;
    let limit = parseInt(size);
    let conditions = {}
    if (keyword) {
      conditions = {
        keyword: {$regex: new RegExp(keyword)}
      }
    }
    sites.find(conditions).skip(skip).limit(limit).sort({time: -1}).toArray((err, result) => {
      if (err) {
        res.json({
          message: '数据查询出错!',
          status: 500,
          data: {}
        });
        throw err;
      }
      sites.find(conditions).toArray((err, rs) => { // 计算总条数
        if (err) {
          res.json({
            message: '数据查询出错!',
            status: 500,
            data: {}
          });
          throw err;
        }
        res.json({
          message: 'ok',
          status: 200,
          data: {
            row: result,
            total: rs.length
          }
        });
      });
    })
  };

  // 新增网站
  this.addSites = (req, res, next) => {
    let file = req.file;
    let data = req.body;
    data.imagename = file.originalname;
    data.src = '/uploads/sites/' + file.filename;
    data.type = data.type.split(',');
    data.time = (new Date()).getTime();
    sites.insertOne(data, function(err, result) {
      if (err) {
        res.json({
          message: '数据插入出错!',
          status: 500,
          data: {}
        });
        throw err;
      }
      res.json({
        message: 'ok',
        status: 200,
        data: result
      });
    });
  }

  // 获取搜索引擎的列表
  this.getSearchEngines =  (req, res) => {
    searchEngines.find({}).toArray((err, result) => {
      if (err) {
        res.json({
          message: '数据查询出错!',
          status: 500,
          data: {}
        });
        throw err;
      }
      res.json({
        message: 'ok',
        status: 200,
        data: {
          row: result,
          total: result.length
        }
      });
    })
  }

  // 添加搜索引擎
  this.addSearchEngines = (req, res, next) => {
    let file = req.file;
    let body = req.body;
    let data = {
      title: body.title,
      description: body.description,
      types: JSON.parse(body.types)
    };
    data.logo = '/uploads/searchEngines/' + file.filename;
    data.time = (new Date()).getTime();
    searchEngines.insertOne(data, function(err, result) {
      if (err) {
        res.json({
          message: '数据插入出错!',
          status: 500,
          data: {}
        });
        throw err;
      }
      res.json({
        message: 'ok',
        status: 200,
        data: result
      });
    });
  }

  // 获取壁纸
  this.getWallpapers = (req, res) => {
    let {page, size} = req.query;
    let skip = (page - 1) * size;
    let limit = parseInt(size);
    wallpapers.find().skip(skip).limit(limit).sort({time: -1}).toArray((err, result) => {
      if (err) {
        res.json({
          message: '数据查询出错!',
          status: 500,
          data: {}
        });
        throw err;
      }
      res.json({
        message: 'ok',
        status: 200,
        data: {
          row: result
        }
      });
    })
  }

  // 添加壁纸
  this.addWallpapers = (req, res) => {
    let files = req.files;
    let dataList = [];
    for(let i = 0, len = files.length; i < len; i++) {
      let obj = {
        name: files[i].originalname,
        src: '/uploads/wallpapers/' + files[i].filename,
        time: (new Date()).getTime()
      }
      dataList.push(obj)
    }
    wallpapers.insertMany(dataList, function (err, result) {
      if (err) {
        res.json({
          message: '数据插入出错!',
          status: 500,
          data: {}
        });
        throw err;
      }
      res.json({
        message: 'ok',
        status: 200,
        data: result
      });
    })
  }
}

module.exports = controller;