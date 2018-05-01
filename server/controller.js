function controller(db) {

  let database = db.db('checkson');
  let sites = database.collection('sites');

  // 获取网站列表信息
  this.getSites = (req, res) => {
    let {page, size, keyword} = req.query;
    let skip = (page - 1) * size;
    let limit = parseInt(size);
    let conditions = {}
    if (!keyword) {
      conditions = {
        keyword: {$regex: new RegExp(keyword)}
      }
    }
    console.log(keyword, conditions)
    sites.find(conditions).skip(skip).limit(limit).sort({time: -1}).toArray(function (err, result) {
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
  };

  // 新增网站
  this.addSites = (req, res, next) => {
    let file = req.file;
    let data = req.body;
    data.imagename = file.originalname;
    data.src = '/uploads/' + file.filename;
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
      res.end(JSON.stringify({
        message: 'ok',
        status: 200,
        data: result
      }));
    });
  }
}

module.exports = controller;