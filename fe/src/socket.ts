import { WS } from 'constant'
import storage from 'helpers/storage'
import io from 'socket.io-client'

const token = storage.getToken()
const socket = io(WS, {
    auth: {
        token
    }
})



export default socket