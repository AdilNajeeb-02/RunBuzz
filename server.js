import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

app.use(express.json());
app.use(express.static("public"));

app.post("/api/overthink", async (req, res) => {

    try {

        const { decision, previousTimeline } = req.body;

        if (!decision) {
            return res.status(400).json({
                error: "Please enter a decision."
            });
        }

        let prompt = `
You are the AI behind a funny useless hackathon project called
"The Other Possibility".

The user is overthinking this decision:

"${decision}"

Your job is to create fictional alternate realities.

Create:

1. THEIR TIMELINE
2. THE OTHER POSSIBILITY

The alternate possibility should be:

- funny
- relatable
- imaginative
- slightly dramatic
- entertaining

Do NOT claim these events are real predictions.

Everything is fictional.

Give a regret score between 0 and 100.

Also provide a funny conclusion.

Return ONLY valid JSON.

Use exactly this format:

{
    "decision": "short title",
    "yourTimeline": [
        "event",
        "event",
        "event"
    ],
    "otherTimeline": [
        "event",
        "event",
        "event"
    ],
    "regret": 80,
    "conclusion": "funny conclusion"
}

Keep the events short.
`;

        if (previousTimeline) {

            prompt += `

The user has already explored this timeline:

${JSON.stringify(previousTimeline)}

Now create a deeper "what if?" branch.

Make it increasingly ridiculous,
but still connected to the original decision.
`;
        }

        const interaction = await ai.interactions.create({

            model: "gemini-3.8-flash",

            input: prompt,

            generation_config: {
                thinking_level: "low"
            }

        });

        let text = interaction.output_text;

        text = text
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        const result = JSON.parse(text);

        res.json(result);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "The alternate universe machine broke 😂"
        });

    }

});

app.listen(PORT, () => {

    console.log(
        `The Other Possibility is running at http://localhost:${PORT}`
    );

});