### vue2_webapp

> 之前用Appcan开发了一款词语听写的hybridApp，这回想用vue重写下

### 功能

* 每日作业查看 
* 口算练习
* 词语听写
  因为webapp手机上还无法进行TTS,
  网页版调了百度接口可以播报语音
* 聊天室

### 技术
* 前端 vue + vuex + vue-router (2.0)
* 后端 express + mongodb
* 工具 webpack + sass + loadsh + eventproxy + socket.io 

### 启动
连接数据库
``` bash
sudo mongod
```
启动redis
``` bash
sudo redis-server
```

启动客户端
``` bash
npm install
npm run dev
```

### demo
<img width="200" height="355" src="./gif/0.gif"/>
<img width="200" height="355" src="./gif/1.gif"/>
<img width="200" height="355" src="./gif/2.gif"/>
