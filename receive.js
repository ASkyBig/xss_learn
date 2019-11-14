// index.js
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function (req, res) {
  // const method = req.method
  // console.log('method', method)
  // console.log('type', req.headers['content-type'])

  // let postData = '';
  // req.on('data', chunk => {
  //     // chunk是原始二进制数据，需要转化成字符串
  //     postData += chunk.toString()
  //  })
   // req.on('end', () => {
   //    console.log('postData', postData)
   //    res.end(postData)
   // })


  if (req.url === '/favicon.ico') {
    return;
  }
  const parseUrl = url.parse(req.url, true);

  // 路由1 /uploadForm  提交表单处理方法，在页面显示刚才表单内填写的内容
  // 路由2 /xssattack   xss 攻击接收浏览器发来的 cookie 接口
  // 路由3 /        返回一个表单
 if (parseUrl.pathname === '/xssattack') {
    res.writeHead(200, {'content-Type':'text/html;charset=UTF-8', 'X-XSS-Protection': '0', 'Access-Control-Allow-Origin': '*'})

    let postData = '';
    req.on('data', chunk => {
        // chunk是原始二进制数据，需要转化成字符串
        postData += chunk.toString()
     })
     req.on('end', () => {
        console.log('postData ===', postData)
        res.end()
     })
  }
});

server.listen(3001, function () {
  console.log('server is starting on port 3001');
});
