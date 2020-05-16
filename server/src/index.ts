import Express from 'express'
import MovieRouter from './routes/MovieRoutes'
import UploadRouter from './routes/UploadRoute'
import history from 'connect-history-api-fallback'

const app = Express();

app.use(history()) // 防止在其它路由刷新页面找不到路径的情况，会自动找根目录下的index.html文件
app.use("/upload", Express.static("public/upload"))
app.use("/", Express.static("public/build"))

app.use(Express.json()); // 配置中间件，将请求体转化为json格式

app.use("/api/movie", MovieRouter)

app.use("/upload", UploadRouter)

app.listen(3000)