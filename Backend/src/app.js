const express = require('express')
const app = express()
const aiRouter = require('./routes/ai.routes')
const cors = require('cors')
app.use(express.json()) // for parsing application/json
app.use(cors())




app.use('/ai',aiRouter)




module.exports=app;