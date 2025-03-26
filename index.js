// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get('/', (req, res) => {
  res.send('Animal Diagnosis API is running');
});

app.post('/diagnose', (req, res) => {
  console.log("Received diagnosis request:", req.body);

  const { animalType, age, size, weight, symptoms } = req.body;

  res.json({
    diagnosis: "Example diagnosis for " + animalType,
    treatments: [
      "Visit vet",
      "Give rest",
      "Prescribed medication"
    ]
  });
});

  const prompt = `
  You're a veterinarian AI. Diagnose based on details:

  Animal: ${animalType}
  Age: ${age}
  Size: ${size}
  Weight: ${weight} kg
  Symptoms: ${symptoms}

  Provide clearly:
  - Diagnosis
  - Three common treatments
  `;

  try {
    const [aiResult, articles] = await Promise.all([
      openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Changed from gpt-4 to gpt-3.5-turbo
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
        max_tokens: 500,
      }),
      scrapeSymptoms(`${animalType} ${symptoms}`),
    ]);

    const aiResponse = aiResult.choices[0].message.content;

    res.json({ diagnosis: aiResponse, relatedArticles: articles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error processing request.' });
  }
});
    const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.listen(5000, () => console.log('Server running on port 5000'));
