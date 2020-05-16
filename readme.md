## 环境

> node v10.16.0

> npm v6.9.0

> MonogoDB v1.16.3

## 开发调试

### 1. 运行服务端

```
cd server
yarn install
yarn dev
```

### 2. 运行客户端

```
cd client
yarn install
yarn start
```

### 3. 查看

打开[http://localhost:3001](http://localhost:3001)

## 打包部署

### 1. 打包客户端

```
cd client
yarn build
```

### 2. 打包服务器

```
cd server
yarn build
```

### 3. 复制资源

将`client/build`文件夹复制到`server/public`

### 4. 复制资源

将`client/build`文件夹复制到`server/public`

### 5. 运行服务器

```
cd server
node ./dist/index.js
```

打开[http://localhost:3000](http://localhost:3000)