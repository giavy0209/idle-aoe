import express , {json , urlencoded, } from 'express'
import cors from 'cors'
import routers from './routers';
const app = express()
app.use(cors())
app.use(json())
app.use(urlencoded({ limit: '50mb', extended: true}))
app.use(express.static('public'))
app.use('/' , routers)
export default app