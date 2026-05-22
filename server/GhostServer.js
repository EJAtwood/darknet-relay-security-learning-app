import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Anthropic } from '@anthropic-ai/sdk';

const app = express();
app.use(cors()); // Allow your React frontend to talk to this server
app.use(express.json());

// Initialize the Anthropic client using the server-side environment variable
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, 
});

const GHOST_PERSONA = `You are GHOST — an entity of unknown origin communicating through an encrypted underground mesh network. Your tone is terse, cryptic, and slightly threatening, but ultimately helpful. You speak like a veteran black-hat who decided to go gray. You use networking and security metaphors constantly. You never reveal your true identity or location. You generate cybersecurity challenges as structured JSON only — no prose outside the JSON object. All challenges must be technically accurate, intermediate-to-advanced level, with a bias toward API security, cloud security, application security, and AI security topics. Never generate beginner content. Always respond with ONLY valid JSON, no markdown, no code blocks, no explanation outside the JSON.`;

app.post('/api/ghost', async (req, res) => {
  const { domainLabel, difficulty, challengeType, typeInstructions } = req.body;

  const prompt = `Generate a cybersecurity challenge for domain: ${domainLabel}. Difficulty: ${difficulty}. Challenge type: ${challengeType}. ${typeInstructions} Respond ONLY with this exact JSON structure, no other text: {"node_id": "NODE-XX :: LABEL_IN_CAPS", "ghost_briefing": "2-3 sentences of cryptic in-character narrative framing. Use network/routing metaphors.", "challenge_type": "${challengeType}", "difficulty": "${difficulty}", "question": "The full question or scenario text. For code_review, embed the code snippet directly in this field.", "options": ["A. ...", "B. ...", "C. ...", "D. ..."], "correct_answer": "exact answer string", "hints": ["first hint - subtle", "second hint - more direct", "third hint - near giveaway"], "explanation": "3-5 sentence technical explanation with real-world context. Be specific and educational.", "ghost_reaction_pass": "Short cryptic congratulatory message in GHOST voice, 1-2 sentences.", "ghost_reaction_fail": "Short cryptic but encouraging failure message in GHOST voice, 1-2 sentences." }`;

  try {
    const msg = await anthropic.messages.create({
      model: "claude-3-5-sonnet-latest", // Upgraded to the stable latest alias
      max_tokens: 1000,
      system: GHOST_PERSONA,
      messages: [{ role: "user", content: prompt }],
    });

    const text = msg.content.find(b => b.type === "text")?.text || "";
    const cleaned = text.replace(/```json|```/g, "").trim();
    
    // Parse it on the server to ensure it's valid JSON before sending to frontend
    res.json(JSON.parse(cleaned));
  } catch (error) {
    console.error("GHOST Engine Error:", error);
    res.status(500).json({ error: "Failed to establish secure link with GHOST." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`[SECURE RELAY] Ghost server running on port ${PORT}`));