const express = require('express');
const app = express();

app.get('/checkson/', (req, res) => {
  res.json({
    status: 200,
    message: '测试成功！'
  })
});

app.get('/', (req, res) => {
  res.send(__dirname + '/views/index.html')
});

const server = app.listen(8888, () => {
  console.log('Server is run at port 8888...')
});