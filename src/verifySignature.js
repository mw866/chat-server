const crypto = require('crypto')

module.exports = function verifySignature (req, res, next) {
  const body = req.rawBody
  const signature = req.get('x-sendbird-signature')
  console.log('signature: ' + signature)

  const hash = crypto
    .createHmac('sha256', process.env.SENDBIRD_API_TOKEN)
    .update(body)
    .digest('hex')
  console.log('hash: ' + hash)

  if (signature === hash) {
    console.log('Exiting verifySignature: Successful')
    next()
  } else {
    console.log('Exiting verifySignature: Unsuccessful')
    res.sendStatus(401)
  }
}
