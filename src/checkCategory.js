module.exports = function checkCategory (req, res, next) {
  console.log('Webhook category: ' + req.body.category)
  if (req.body.category === 'group_channel:create') {
    console.log('Existing checkCategory: Successful')
    next()
  } else {
    console.log('Existing checkCategory: Unsuccessful')
  }
}
