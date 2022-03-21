import fs from 'fs'
import path from 'path'
import { waitfor } from '../utils'
const workers = fs.readdirSync(__dirname)

async function worker() {
    let lastRun = Date.now()
    while (true) {
        const _workers = workers.filter(o => o !== 'index.ts')
        const workerPromise = []
        for (let index = 0; index < _workers.length; index++) {
            const workerDir = _workers[index];
            const worker = require(path.join(__dirname, workerDir)).default
            workerPromise.push(worker()) 
        }
        await Promise.all(workerPromise)
        lastRun = Date.now()
        if(Date.now() - lastRun < 100) {
            await waitfor(100 - (Date.now() - lastRun))
        }

        // await waitfor(1000)
    }
}


worker()