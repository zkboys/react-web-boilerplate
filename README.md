# react-web-boilerplate

基于 react react-router@4 redux antd 的管理系统框架

## 相关文档

- [models(redux)](https://github.com/zkboys/react-web-boilerplate/blob/master/src/models/README.md)
- [layouts(布局)](https://github.com/zkboys/react-web-boilerplate/blob/master/src/layouts/README.md)
- [router(路由)](https://github.com/zkboys/react-web-boilerplate/blob/master/src/router/README.md)
- [services(服务)](https://github.com/zkboys/react-web-boilerplate/blob/master/src/services/README.md)

## 依赖
1. nodejs v8.1.3
1. yarn v1.3.2
1. 兼容windwos / mac / ubuntu

## 安装 & 启动

下载
```
$ git clone https://github.com/zkboys/react-web-boilerplate.git
```

安装依赖
```
$ cd react-web-boilerplate
$ yarn
```

开发模式运行
```
$ yarn start
```

构建生产
```
$ yarn build
```
## 项目结构
```
.
├── public          // 静态文件存放目录，不经过webpack打包但是项目中还用到的文件
└── src
    ├── commons     // 公共方法
    ├── components  // 通用业务组件
    ├── e2e         // 端对端测试
    ├── layouts     // 布局
    ├── mock        // mock数据
    ├── models      // redux 封装，模块，提供数据
    ├── pages       // 各个页面
    ├── router      // 路由相关
    └── services    // 服务    
```

## 连接后端
开发时通过在.roadhogrc文件中[配置proxy](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually)，与后端进行连接;
生产环境通过nginx进行配置；

### 开发环境
.roadhogrc文件中：
```
"proxy": {
    "/api": {
      "target": "http://192.168.0.103:8080"
    }
}
```
注：`api` 为前后端约定的请求地址前缀，一般axios`baseURL`也配置成 `api` ，具体以团队约定为准。

### 生产环境
前后端分离 ngnix配置 参考：
```
# 服务地址
upstream api_service {
  server localhost:8080;
  keepalive 2000;
}
#
server {
    listen       80;
    server_name  localhost;
    location / {
      root /home/app/nginx/html; // 前端打包之后的文件存放路径
      index index.html;
      try_files $uri $uri/ /index.html; #react-router 防止页面刷新出现404
    }
    location ^~/api { // 代理ajax请求
       proxy_pass http://api_service/;
       proxy_set_header Host  $http_host;
       proxy_set_header Connection close;
       proxy_set_header X-Real-IP $remote_addr;
       proxy_set_header X-Forwarded-Server $host;
    }
}
```

## TODO

- [ ] babel 升级到7 使用 [optional-chaining](https://www.npmjs.com/package/babel-plugin-transform-optional-chaining)简化取值判断;
- [ ] 前端监控
- [ ] e2e 测试

