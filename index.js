  // index.js
const http = require('http');
const fs = require('fs');
const url = require('url');

const server = http.createServer(function (req, res) {
  if (req.url === '/favicon.ico') {
    return;
  }
  const parseUrl = url.parse(req.url, true);

  // console.log(parseUrl)

  // 路由1 /uploadForm	提交表单处理方法，在页面显示刚才表单内填写的内容
  // 路由2 /xssattack		xss 攻击接收浏览器发来的 cookie 接口
  // 路由3 /  			返回一个表单
  if (parseUrl.pathname === '/uploadForm') {
    res.writeHead(200, {'content-Type':'text/html;charset=UTF-8', 'X-XSS-Protection': '0'})
    const username = parseUrl.query.username;
    const linkurl = parseUrl.query.redirect;
    // console.log('username', username)
    // const name = username.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&#39;').replace(/"/g,'&quot;')
    // console.log('name ===', name)
    res.write(`<h>${username}</h><a href="${linkurl}">跳转</a>`);
    res.end();
  } else {
    res.writeHead(200, {'content-Type':'text/html;charset=UTF-8', 'X-XSS-Protection': '0', 'Set-Cookie': 'myCookie1=test11'})
    res.write(`
			<form method="get" action="/uploadForm">
				<input type="text" style="width: 600px;" placeholder="输入用户名" name="username">
				<button type="submit">提交</button>
			</form>
		`)
    res.end();
  }
});

server.listen(3000, function () {
  console.log('server is starting on port 3000');
});
