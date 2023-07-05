# **DISCORD SPIKE**

Spike for [WEBUP-920](https://bitovi.atlassian.net/browse/WEBUP-920).


## Project Info


#### Getting Started: 
For setting up the project, create a `.env` file using our `.env.example` and place your relevant discord keys, `npm install` then using the scrips below for starting up the application.

- `npm run dev` to start front end.
- `npm run start:server` to start backend application.

#### Folder Structure:
```text
|- Backend
    |- app.js : Small proxy server connecting to discord message end point.
|- Frontend.
    |- app.tsx 
|- env.example : environment file containing discord API keys/tokens.
```



## NOTES/FINDINGS:

[Get Message Endpoint](https://discord.com/developers/docs/resources/channel#get-channel-messages):  /channels/[channel.id](https://discord.com/developers/docs/resources/channel#channel-object)/messages

For making this we need a Bot Token Authorization Header as this endpoint does not use OAuth2.0 like other discord endpoint.

eg: `Authorization: Bot MTk4NjIyNDgzNDcxOTI1MjQ4.Cl2FMQ.ZnCjm1XVW7vRze4b7Cq4se7kKWs`. To get a bot token you first have to create a Bot, this can be done on the [Discord Developer Portal](https://discord.com/developers/applications?new_application=true).

**NOTE**: The bot needs access to whatever channel/thread it will be viewing, so give access only to channels it would be viewing.

Below is and example of a request to the get message endpoint and the data returned:

#### Get Messages Fetch request.
```js
var myHeaders = new Headers();
myHeaders.append("Authorization", "Bot <BOT TOKEN>");

var requestOptions = {
method: 'GET',
headers: myHeaders,
redirect: 'follow'
};

fetch("https://discord.com/api/v10/channels/{channel_id||thread_id}/messages", requestOptions)
.then(response => response.text())
.then(result => console.log(result))
.catch(error => console.log('error', error));

```

#### Message Data.
```json

[
    {
    "id": "1122868555264839682",
    "type": 0,
    "content": "``` \nyess\n```",
    "channel_id": "1122868445231452241",
    "author": {
    "id": "355913069156761601",
    "username": "nevikk",
    "global_name": "Nevikk",
    "avatar": "6303bf358c1a22c8e858cdc959c3eaed",
    "discriminator": "0",
    "public_flags": 0,
    "avatar_decoration": null
    },
    "attachments": [],
    "embeds": [],
    "mentions": [],
    "mention_roles": [],
    "pinned": false,
    "mention_everyone": false,
    "tts": false,
    "timestamp": "2023-06-26T12:38:45.464000+00:00",
    "edited_timestamp": null,
    "flags": 0,
    "components": [],
    "position": 1
    }
]

```


By default, the request returns 50 elements, to this can be adjusted through the `limit` [query param](https://discord.com/developers/applications?new_application=true). The query params can also be used for pagination via the before, after and around fields which takes the message_id.



#### Rate Limiting.

Lastly for rate limit considerations, our Blogs are getting on average 1000 views a day, which would  equate to ~1 view  per second taking this into consideration with the [Global Rate Limits](https://discord.com/developers/docs/topics/rate-limits#global-rate-limit) for discord API, 50 request per route, we would not need any caching initially as we are far from the rate limits.
