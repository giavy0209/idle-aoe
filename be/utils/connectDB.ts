const mongoose = require('mongoose')

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_DB,
} = global.Config

const auth = MONGO_USER && MONGO_PASSWORD ? MONGO_USER + ':' + encodeURIComponent(MONGO_PASSWORD) + '@' : ''

const dbURI = `mongodb://localhost:27017/${MONGO_DB}`
console.log(dbURI);

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('connected db')
  })
  .catch((e : any) => {
    console.log(e)
  })