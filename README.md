# Chat Server 

A  server that sends an admin message when a group channel is created on Sendbird.

The server handles the [incoming webhooks from Sendbird](https://sendbird.com/docs/chat/v3/platform-api/guides/webhooks) using [Express](https://expressjs.com/) and sends chat messages by making an outbound request at [Sendbird's Platform API](https://sendbird.com/docs/chat/v3/platform-api/guides/messages#2-send-a-message).

And the admin message says:

>  “Don’t call us, we’ll call you” - [Hollywood Principle](https://wiki.c2.com/?HollywoodPrinciple)

## Demo
The demo server is available at https://chat-server.chriswang.tech/webhook

## Getting Started

1. Set your Sendbird API token.
```
export SENDBIRD_API_TOKEN=<YOUR_SENDBIRD_API_TOKEN>
```

2. Start the local server
```
npm start
```

## Design

A `POST` request at the `/webhook` route is handled by the following middleware functions in the following orders.

1. `verifySignature` calculates the hmac from the raw body and compares it with  [`x-sendbird-signature`](https://sendbird.com/docs/chat/v3/platform-api/guides/webhooks#2-headers-3-x-sendbird-signature).
* If the result is an exact match, the function calls the next function in the chain. 
* Otherwise, the function returns a `401` error response.
2. `checkCategory` checks if [the category of the webhook event](https://sendbird.com/docs/chat/v3/platform-api/guides/webhooks#2-webhook-events) is  'group_channel:create'.
* If the result is true,  the function calls the next function in the chain.
* Otherwise, the function ends the chain.
3. `sendMessage` makes a `POST` request to [Sendbird's Platform API](https://sendbird.com/docs/chat/v3/platform-api/guides/messages#2-send-a-message) with the `channel_url` in the incoming webhook.
* If the request is sent successful is successful,  the function returns a `200`  response with `success: true` in the body.
* Otherwise, the function returns a `200`  response with `success: false` in the body.
