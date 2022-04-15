import http from 'http'
import app from './createExpress'
const server = http.createServer(app)
server.listen(global.Config.PORT)

export default server