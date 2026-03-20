import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",   // ✅ updated model
        messages: [
          { role: "system", content: "You are a helpful chatbot." },
          { role: "user", content: userMessage }
        ]
      })
    });

    const data = await response.json();

  
    if (!data.choices) {
      console.log("API ERROR:", data);
      return res.json({
        reply: "API error - check terminal"
      });
    }

    res.json({
      reply: data.choices[0].message.content
    });

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.json({
      reply: "Error connecting to AI"
    });
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
