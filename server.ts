import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

// Handle JSON requests
app.use(express.json());

// Initialize Gemini AI securely on the server
let aiClient: GoogleGenAI | null = null;
const GEMINI_KEY = process.env.GEMINI_API_KEY;

if (GEMINI_KEY && GEMINI_KEY !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: GEMINI_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
    console.log("Gemini client successfully initialized on server.");
  } catch (error) {
    console.error("Failed to initialize Gemini client:", error);
  }
} else {
  console.log("No valid GEMINI_API_KEY found. Server will run with dynamic high-quality local meme thoughts.");
}

// Fallback pool of Trump thoughts in case API key is missing or fails
const FALLBACK_THOUGHTS = [
  "I am thinking about a green candle. The tallest, most beautiful green candle you have ever seen. Many people are crying because they sold too early. Sad!",
  "My brain is operating at a level that has never been seen before, believe me. Some say it's the 100x pump, some say it's 1000x. I say it's infinite.",
  "They told me Solana is fast. I said, make it faster! We need the hugest blocks, blocks so big they'll make your head spin.",
  "Nobody knows more about liquidity pools than me. I know them, you know them, the fake news doesn't want you to know them.",
  "I was thinking about the next 100x coin, and then I realized... I am already thinking. And that is worth more than any coin. Very smart!",
  "The longer I think, the more unhinged the timeline gets. Elon called me, he said 'Sir, how do you think so big?' I said it's natural, Elon, it's natural.",
  "Are we pumping? Yes, we are pumping. It's a tremendous pump. Not like the disaster pump from the other guys.",
  "Is my brain absolutely empty or is it filled with the greatest blockchain secrets ever compiled? Very smart people are saying both.",
  "I am thinking about McDonald's French Fries... and how we can put them on the blockchain. A beautiful, crispy ledger. The hugest transaction speed.",
  "Some people think I am just thinking. No, I am conducting a masterclass in holding. A masterclass in diamond hands. Tremendous strength!"
];

// Robust multi-stage generator to handle 503 high demand and other API errors
async function generateTrumpThought(aiClient: any, prompt: string, topic?: string): Promise<{ thought: string, source: string }> {
  const modelsToTry = ["gemini-3.7-flash", "gemini-3.1-flash-lite", "gemini-flash-latest"];
  
  for (const model of modelsToTry) {
    try {
      console.log(`Attempting Gemini thought generation with model: ${model}`);
      const response = await aiClient.models.generateContent({
        model: model,
        contents: prompt,
        config: {
          temperature: 1.0,
          systemInstruction: "You are the comedic meme persona of Donald Trump, deeply thinking about cryptocurrency, blockchain, the future of the universe, or absolutely trivial things. You speak in short, punchy sentences, using boastful and hilarious exaggerations."
        }
      });
      
      const text = response.text?.trim();
      if (text) {
        console.log(`Successfully generated thought with model: ${model}`);
        return { thought: text, source: model };
      }
    } catch (err: any) {
      console.log(`[Gemini warning] Model ${model} is currently unavailable: ${err?.message || err}`);
    }
  }
  
  // If we reach here, all AI model attempts failed. Generate a high quality local response
  let fallbackThought = FALLBACK_THOUGHTS[Math.floor(Math.random() * FALLBACK_THOUGHTS.length)];
  if (topic) {
    fallbackThought = `I am thinking about "${topic}" right now. Let me tell you, it's a tremendous topic. The hugest! A lot of very smart people are saying "${topic}" is going to pump 100x on Solana. Believe me!`;
  }
  console.log("All Gemini models unavailable or rate-limited. Returned high-quality local template thought.");
  return { thought: fallbackThought, source: "offline-template" };
}

// API endpoint for generating Trump thoughts
app.post("/api/thoughts", async (req, res) => {
  try {
    const { topic } = req.body;
    
    // Craft a funny, personalized Trump-style response based on topic (if provided) or random
    const prompt = topic 
      ? `Generate a single, hilariously unhinged, brief thought from the mind of 'Thinking Trump' about this topic: "${topic}". The thought must be filled with iconic Trump-isms ('tremendous', 'hugest', 'very smart people', 'fake news', '100x', 'sad', 'believe me'). Make it sound like he is deeply contemplating this topic on the blockchain, linking it to crypto, pumps, or absolutely nothing. Keep it between 1 and 3 sentences, highly engaging, and in his voice. Do not include quotes, hashtags, or markdown formatting.`
      : `Generate a single, hilariously unhinged, brief thought from the mind of 'Thinking Trump' (Donald Trump contemplating the universe, blockchain, and timeline). It must be funny, quirky, and filled with classic Trump-isms ('tremendous', 'hugest', 'very smart people', 'fake news', 'pumps', 'green candles', '100x', 'sad!'). Keep it between 1 and 3 sentences. Do not include quotes, hashtags, or markdown formatting. Just output the raw text.`;

    if (aiClient) {
      const result = await generateTrumpThought(aiClient, prompt, topic);
      return res.json(result);
    }
    
    // Fallback: Pick a random funny thought or customize fallback slightly if topic is provided
    let fallbackThought = FALLBACK_THOUGHTS[Math.floor(Math.random() * FALLBACK_THOUGHTS.length)];
    if (topic) {
      fallbackThought = `I am thinking about "${topic}" right now. Let me tell you, it's a tremendous topic. The hugest! A lot of very smart people are saying "${topic}" is going to pump 100x on Solana. Believe me!`;
    }
    return res.json({ thought: fallbackThought, source: "offline-local" });
  } catch (error) {
    console.log("Error in /api/thoughts wrapper:", error);
    const fallbackThought = FALLBACK_THOUGHTS[Math.floor(Math.random() * FALLBACK_THOUGHTS.length)];
    return res.json({ thought: fallbackThought, source: "offline-fallback" });
  }
});

// Configure Vite middleware in dev, serve static in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite dev server middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static production files from dist...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
