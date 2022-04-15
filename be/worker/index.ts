import fs from 'fs'
import path from 'path'
const workers = fs.readdirSync(__dirname)
async function worker() {
    const _workers = workers.filter(o => !o.includes('index'))
    for (let index = 0; index < _workers.length; index++) {
        const workerDir = _workers[index];
        const worker = require(path.join(__dirname, workerDir)).default
        worker()
    }
}


export default worker
