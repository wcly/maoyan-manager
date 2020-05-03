import Express from 'express'
import MovieRouter from './routes/MovieRoutes'

const app = Express();

app.use(Express.json()); // 配置中间件，将请求体转化为json格式

app.use("/api/movie", MovieRouter)

app.listen(3000)