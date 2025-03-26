const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Basic test route
app.get('/', (req, res) => {
  res.send('Animal Diagnosis API is running.');
});

// POST /diagnose route using OpenAI
app.post('/diagnose', async (req, res) => {
  try {
    const { animalType, age, size, weight, symptoms } = req.body;

    const prompt = `
You are a veterinary assistant AI. Based on the following details, provide:
1. A possible diagnosis
2. Three common treatments
3. A disclaimer that a licensed vet should be consulted

Details:
- Animal Type: ${animalType}
- Age: ${age}
- Size: ${size}
- Weight: ${weight}kg
- Symptoms: ${symptoms}
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 400,
    });

    const aiText = completion.choices[0].message.content;

    res.json({
      diagnosis: aiText
    });
  } catch (error) {
    console.error('Diagnosis failed:', error);
    res.status(500).json({ error: 'Diagnosis error' });
  }
});

// Required for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
