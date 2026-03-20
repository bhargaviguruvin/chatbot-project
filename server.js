import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/chat", (req, res) => {
  const userMessage = req.body.message.toLowerCase();

  let reply = "Sorry, I don't understand 😅";

  if (userMessage.includes("hello")) {
    reply = "Hi there! 👋";
  } 
  else if (userMessage.includes("how are you")) {
    reply = "I'm fine! 😊";
  } 
  else if (userMessage.includes("your name")) {
    reply = "I am a rule-based chatbot 🤖";
  } 
  else if (userMessage.includes("bye")) {
    reply = "Goodbye! 👋";
  } 
  else if (userMessage.includes("help")) {
    reply = "I can respond to greetings like hello, bye, etc.";
  }

  res.json({ reply });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
  
  
