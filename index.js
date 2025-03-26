const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Basic test route
app.get('/', (req, res) => {
  res.send('Animal Diagnosis API is running.');
});

// Async /diagnose route
app.post('/diagnose', async (req, res) => {
  try {
    const { animalType, age, size, weight, symptoms } = req.body;

    // Simulated diagnosis and treatments
    const aiResult = `Example diagnosis for a ${age}-year-old ${size} ${animalType} showing symptoms of ${symptoms}.`;

    const treatments = [
      "Take to a licensed veterinarian for examination",
      "Monitor symptoms for 24-48 hours",
      "Ensure adequate hydration and rest"
    ];

    res.json({
      diagnosis: aiResult,
      treatments: treatments
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

