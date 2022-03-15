import http from 'http'
import express , {json , urlencoded, } from 'express'
import { Server } from "socket.io";

import cors from 'cors'

import routers from './routers';
import 'config'
import 'helpers/connectDB'
import 'helpers/InitBuilding'

const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(json())
app.use(urlencoded({ limit: '50mb', extended: true}))
app.use('/' , routers)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

server.listen(global.Config.PORT)