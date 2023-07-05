import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import axios from "axios";

let reqInstance = axios.create({
  headers: {
    Authorization : `Bot ${process.env.DISCORD_TOKEN}`
  }})

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
app.use(cors())


app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});


/**
 * Get channel messages.
 * @channel_id : Channel/Thread ID
 */
app.get('/forums/:channel_id/messages', async function (req, res) {
  const {channel_id} = req.params;
  const { limit } = req.query;

  const DISCORD_BASE_API = process.env.DISCORD_BASE_API;
  const version = process.env.DISCORD_API_VERSION;

  const result = await reqInstance.get(`${DISCORD_BASE_API}/v${version}/channels/${channel_id}/messages`)

  return res.json(result.data);
})

