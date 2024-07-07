import koa from 'koa'
import bodyParser from 'koa-body'
import router from './routes/index'
import dotenv from "dotenv";
import mongoose from 'mongoose'

dotenv.config();

const app = new koa()
const port = process.env.PORT || 3000

app.use(bodyParser({ multipart: true, urlencoded: true }))
app.use(router.routes())

mongoose.connect(process.env.MONGO_URL, {dbName: process.env.MONGO_DB_NAME})
const db = mongoose.connection

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

export { server, app }