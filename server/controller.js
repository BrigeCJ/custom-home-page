function controller(db) {

  let database = db.db('checkson');
  let sites = database.collection('sites');
  let searchEngines = database.collection('searchengines');
  let wallpapers = database.collection('wallpapers');

  let ObjectId = require('mongodb').ObjectID;

  /************************************************** 网站 ************************************************************/
  // 获取网站列表信息
  this.getSites = (req, res) => {
    let {page, size, keyword, type} = req.query;
    let skip = (page - 1) * size;
    let limit = parseInt(size);
    let conditions = { deleted: false }
    let sort = { create_time: -1 };
    if (keyword) {
      conditions['keyword'] = {
        $regex: new RegExp(keyword)
      }
    }
    if (type) {
      if (type === 'popular') {
        sort = { rate: -1 }
      } else {
        conditions['type'] = {
          $elemMatch: { $eq: type }
        }
      }
    }
    sites.find(conditions).skip(skip).limit(limit).sort(sort).toArray((err, result) => {
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

  // 新增/编辑网站
  this.addSites = (req, res, next) => {
    let file = req.file;
    let data = req.body;
    let _id = data._id;
    let timer = (new Date()).getTime()

    data.type = data.type.split(',');
    data.update_time = timer
    delete data._id; // 删除_id属性

    if (parseInt(_id) === -1) { // 新增
      data.imagename = file.originalname;
      data.src = '/uploads/sites/' + file.filename;
      data.create_time = timer;
      data.deleted = false;
      data.rate = 0;
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
    } else { // 编辑
      if (typeof file !== 'undefined') {
        data.imagename = file.originalname;
        data.src = '/uploads/sites/' + file.filename;
      }
      _id = ObjectId(_id);
      sites.update({_id: _id}, {$set: data}, function(err, result) {
        if (err) {
          res.json({
            message: '数据修改出错!',
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
  };

  // 删除网站
  this.deleteSites = (req, res) => {
    let _id = req.params.id
    _id = ObjectId(_id)
    sites.update({_id: _id},{$set: {deleted: true}}, function (err, result) {
      if (err) {
        res.json({
          message: '数据删除出错!',
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
  };

  /************************************************** 搜索引擎 ************************************************************/
  // 获取搜索引擎的列表
  this.getSearchEngines =  (req, res) => {
    searchEngines.find({deleted: false}).sort({create_time: 1}).toArray((err, result) => {
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
    let _id = body._id;
    let timer = (new Date()).getTime()

    let data = {
      title: body.title,
      description: body.description,
      types: JSON.parse(body.types),
      update_time: timer
    };

    if (typeof file !== 'undefined') {
      data.logo = '/uploads/searchEngines/' + file.filename;
    }

    if (parseInt(_id) === -1) { // 新增
      data.create_time = timer;
      data.deleted =  false;
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
    } else { // 修改
      _id = ObjectId(_id);
      searchEngines.update({_id: _id}, {$set: data}, function(err, result) {
        if (err) {
          res.json({
            message: '数据修改出错!',
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
  };

  this.deleteSearchEngines = (req, res) => {
    let _id = req.params.id
    _id = ObjectId(_id)
    searchEngines.update({_id: _id},{$set: {deleted: true}}, function (err, result) {
      if (err) {
        res.json({
          message: '数据删除出错!',
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
  };

  /************************************************** 壁纸 ************************************************************/
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

  // 随机获取壁纸
  this.getRandomWallpapers = (req, res) => {
    wallpapers.find().count((err, count) => {
      if (err) {
        res.json({
          message: '数据查询出错!',
          status: 500,
          data: {}
        });
      }
      let randomNum = Math.floor(count*Math.random());
      wallpapers.find().skip(randomNum).limit(1).toArray(function (err, result) {
        if (err) {
          res.json({
            message: '数据查询出错!',
            status: 500,
            data: {}
          });
        }
        res.json({
          message: 'ok',
          status: 200,
          data: {
            row: result,
            total: 1
          }
        })
      });
    })
  }
}

module.exports = controller;