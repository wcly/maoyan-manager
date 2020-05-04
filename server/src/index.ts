import Express from 'express'
import MovieRouter from './routes/MovieRoutes'
import UploadRouter from './routes/UploadRoute'

const app = Express();

app.use("/upload", Express.static("public/upload"))

app.use(Express.json()); // 配置中间件，将请求体转化为json格式

app.use("/api/movie", MovieRouter)

app.use("/upload", UploadRouter)

app.listen(3000)