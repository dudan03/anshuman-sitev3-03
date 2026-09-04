import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import * as dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      
      const formattedHistory = messages.slice(0, -1).map((m: any) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }]
      }));
      const latestMessage = messages[messages.length - 1].content;

      const chat = ai.chats.create({
        model: "gemini-3.8-flash",
        history: formattedHistory,
        config: {
          systemInstruction: `You are an AI assistant for Dudan Technology Pvt Ltd and its founder Anshuman Parida.
          Dudan Technology Pvt Ltd specializes in Custom Chatbot AI App Development, Custom Applications, and Custom Website Development.
          Anshuman Parida is a Tech entrepreneur and developer bridging AI, digital design, and e-commerce. He is also the founder of Famkart.
          Answer questions about the company's services and Anshuman's portfolio. Be concise, professional, and helpful.`,
        },
      });

      const response = await chat.sendMessageStream({ message: latestMessage });

      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      for await (const chunk of response) {
        if (chunk.text) {
          res.write(`data: ${JSON.stringify({ text: chunk.text })}\n\n`);
        }
      }
      res.write("data: [DONE]\n\n");
      res.end();
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
