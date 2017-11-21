# react-web-boilerplate

基于 react react-router@4 redux antd 的管理系统框架

## 依赖
1. nodejs v8.1.3
1. yarn v0.27.5
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

## 连接后端
开发时通过[配置proxy](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#configuring-the-proxy-manually)，与后端进行连接;
生产环境通过nginx进行配置；

### 开发环境
package.json文件中：
```
"proxy": {
    "/api": {
      "target": "http://192.168.0.103:8080"
    }
}
```
注：`api` 为前后端约定的请求地址前缀，具体以团队约定为准

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

- [ ] 构建优化，目前rebuild 和 build 都比较慢；
