## Custom-Home-Page
>自定义首页，是本人2018年毕业设计，采用前后端分离技术。

### Demo
[线上前端地址](http://139.199.152.49/)
<br/>
[线上后端地址](http://139.199.152.49/:3000/)

### 技术栈
- 前端
   + [React](https://reactjs.org/) 是由Facebook公司开发，并在2013年5月开源，用户构建用户界面的JavaScript库。
   + [Redux](https://redux.js.org/) 是前端里面用于应用数据流的框架，由Dan Abramov在在2015年创建的科技术语。
   + [create-react-app](https://www.npmjs.com/package/create-react-app) 使用于快速构建React应用的脚手架，类似Vue中的[vue-cli](https://www.npmjs.com/package/vue-cli)，和Angular中的[angular-cli](https://cli.angular.io/)
- 后端
   + [Vue](https://cn.vuejs.org/v2/guide/index.html) 是一套用于构建用户界面的渐进式框架。
   + [Vuex](https://vuex.vuejs.org/zh/) 类似上述提到的Redux。
   + [Vue-Router](https://router.vuejs.org/zh/) 控制路由跳转。
   + [Element UI](http://element.eleme.io/#/zh-CN) 基于Vue2.x的组件库。
   + [vue-cli](https://www.npmjs.com/package/vue-cli) 快速构建Vue应用脚手架。
- 服务端
   + [Node.js](https://nodejs.org/en/) JavaScript运行时，提供高性能的服务端。
   + [Express](http://www.expressjs.com.cn/) 用户快速搭建Node服务器的框架。
- 数据库
   + [MongoDB](https://www.mongodb.com/) 是一个基于分布式文件存储、高性能、介于关系型和非关系型数据库之间的数据库。
- http转发
   + [Nginx](http://nginx.org/) 是一个高性能的HTTP和反向代理服务器，也是一个IMAP/POP3/SMTP服务器。

### 项目本地运行
#### 1.拉取项目
```
   git clone https://github.com/Checkson/custom-home-page
```
#### 2.包安装
```
   cd custom-home-page
   // 前端
   npm install
   // 后端
   cd server/views
   npm install
```
#### 3.本地运行
```
   // 前端
   npm run start
   // 后端
   npm run dev
```
#### 4.生产打包
```
    // 前端
    npm run build
    // 后端
    npm run build
```
#### 5.启动服务端
```
    cd server/
    node app.js
```

### 数据库设计
- 数据库名 checkson
- 数据库集合(collections)
    + sites
    + searchengines
    + wallpapers
- 文档详情在server/controller/的各个新增接口中有展示。

### Nginx配置
前端开发配置
```
upstream graduatedDesign_page_server{
	server localhost:3000;
}
upstream graduatedDesign_romote_server{
	server localhost:8888;
}

server{
	listen		80;
	server_name 127.0.0.1;

	location /{
		index				index.html;
		proxy_pass			http://graduatedDesign_page_server;
		proxy_set_header		Host $host;
		proxy_set_header		X-Real-Ip $remote_addr;
		proxy_set_header		X-Forwarded-For $remote_addr;
	}
	location ~ ^/(api|uploads)/(.*)
	{
		index				index.html;
		proxy_pass			http://graduatedDesign_romote_server;
		proxy_set_header		Host $host;
		proxy_set_header		X-Real-Ip $remote_addr;
		proxy_set_header		X-Forwarded-For $remote_addr;
		add_header Cache-Control no-store;
	}

}
```
后端开发配置
```
upstream graduatedDesign_page_server{
	server localhost:8080;
}
upstream graduatedDesign_romote_server{
	server localhost:8888;
}


server{
	listen		80;
	server_name 127.0.0.1;

	location /{
		index				index.html;
		proxy_pass			http://graduatedDesign_page_server;
		proxy_set_header		Host $host;
		proxy_set_header		X-Real-Ip $remote_addr;
		proxy_set_header		X-Forwarded-For $remote_addr;
	}
	location ~ ^/(api|uploads)/(.*)
	{
		index				index.html;
		proxy_pass			http://graduatedDesign_romote_server;
		proxy_set_header		Host $host;
		proxy_set_header		X-Real-Ip $remote_addr;
		proxy_set_header		X-Forwarded-For $remote_addr;
		add_header Cache-Control no-store;
	}

}
```

### 注意
该项目不适合前端初学者应用，本人书写该文档时忽略了很多本项目其他的技术要点和细节。本项目开发周期仅为两周，很多功能需要日后继续完善。

### 特别鸣谢
该项目前端界面参考Chrome的Infinity插件，并用React重现其基本功能。