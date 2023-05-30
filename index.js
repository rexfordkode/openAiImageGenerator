require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const { OPENAI_API_KEY } = process.env;
app.use(bodyParser.json());
app.use(cors());

const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/create", async (req, res) => { 
  const { prompt } = req.body;
 
  try {
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "512x512",
    }); 
    res.send(response.data.data[0].url);
  } catch (err) {
    res.send(err.message);
  }
});
 

app.listen(8080, () => {
  console.log(`Server started http://localhost:8080`);
});