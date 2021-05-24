const axios = require('axios')

module.exports = function sendMessage (req, res, next) {
  let channelURL
  try {
    channelURL = req.body.channel.channel_url
  } catch (e) {
    console.log(e)
  }
  const data = {
    message_type: 'ADMM',
    message: '[Group Channel Created] "Don\'t Call Us, We\'ll Call You." - The Hollywood Principle',
    data: {
      timestamp: (new Date(Date.now())).toJSON()
    },
    custom_type: 'notice',
    is_silent: false
  }
  const config = {
    method: 'post',
    url: `https://api-7fb70c46-5881-44ed-8ee7-8b41c8079a5a.sendbird.com/v3/group_channels/${channelURL}/messages`,
    headers: {
      'Content-Type': 'application/json; charset=utf8',
      'Api-Token': process.env.SENDBIRD_API_TOKEN
    },
    data: data
  }

  axios(config)
    .then((response) => {
      console.log(JSON.stringify(response.status))
      console.log(JSON.stringify(response.data))
      res.status(200).json({ success: true, message: 'Successfully sent group message.' })
    })
    .catch((error) => {
      console.log(error.toJSON())
      res.status(200).json({ success: false, message: 'Failed to send group message.' })
    })
}
