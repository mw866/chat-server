const express = require('express')
const bodyParser = require('body-parser')

const sendMessage = require('./sendMessage')
const verifySignature = require('./verifySignature')
const checkCategory = require('./checkCategory')

const app = express()
const PORT = process.env.PORT || 3000
const jsonParser = bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf
  }
})

app.use(jsonParser)

app.post('/webhook',
  verifySignature,
  checkCategory,
  sendMessage
)

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))

module.exports = app
