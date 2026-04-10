import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/webhook", async (req, res) => {
  const texto = req.body.queryResult.queryText;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      input: texto
    })
  });

  const data = await response.json();
  const reply = data.output[0].content[0].text;

  res.json({
    fulfillmentText: reply
  });
});

app.listen(3000);
