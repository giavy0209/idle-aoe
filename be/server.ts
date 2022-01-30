import fs from 'fs'
import http from 'http'
import express from 'express'
import { Server } from "socket.io";

import cors from 'cors'
import './config'
import './helpers/connectDB'

declare function require(name: string): any;

const app = express()
const server = http.createServer(app)

app.use(cors())

fs.readdirSync('./models').forEach(model => {
    require(`./models/${model}`)
})

fs.readdirSync('./routers').forEach(router => {
    const route = require(`./routers/${router}`)
    route(app)
})

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

server.listen(global.Config.PORT)