import mongoose from 'mongoose'
import worker from 'worker'
import InitBuilding from './InitBuilding'
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
} = global.Config

const auth = MONGO_USER && MONGO_PASSWORD ? MONGO_USER + ':' + encodeURIComponent(MONGO_PASSWORD) + '@' : ''

const dbURI = `mongodb://${auth}${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}${auth ? '?authSource=admin' : ''}`

mongoose.connect(dbURI, {
})
  .then(() => {
    console.log('connected db')
    InitBuilding()
    worker()
  })
  .catch((e : any) => {
    console.log(e)
  })