import { Server, Socket } from "socket.io";
import {verify} from 'jsonwebtoken'
import server from '../server'
import {Users} from "models";
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

const updateSocket = async (io : Server, _id : string) => {
    const ids = await io.in(_id + '').allSockets()
    console.log(ids);
    
    const idsArray = []
    for (const id of ids) {
        idsArray.push(id);
    }
    const update : {
        sockets : string[],
        lastOnline? : Date | number
    } = {
        sockets : idsArray
    }
    if(idsArray.length === 0) {
        update.lastOnline = Date.now()
    }
    await Users.findByIdAndUpdate(_id, update)
}

io.use((socket , next) => {
    const { token } = socket.handshake.auth
    if (!token) return socket.disconnect()
    try {
        const payload : any = verify(token, global.Config.JWT)
        const _id = payload._id
        socket.data = {_id}
        socket.join(_id + '')
    } catch (error) {
        socket.disconnect()
        return
    }
    next()
})

io.on('connection' , socket => {
    updateSocket(io , socket.data._id)
    socket.on('disconnect' , async () => {
        updateSocket(io , socket.data._id)
    })
})

export default io