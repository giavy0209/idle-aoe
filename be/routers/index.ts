import fs from 'fs'
import path from 'path'
import {Router} from 'express'
const prefix = '/'
const router = Router()
const routes = fs.readdirSync(__dirname)

routes.filter(o => o !== 'index.ts')
.forEach(route => router.use(prefix , require(path.join(__dirname , route)).default))

export default router
