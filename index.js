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
    // Simulate async operations (you can replace these with real functions)
    const aiResult = "Example AI diagnosis";
    const articles = ["Article 1", "Article 2", "Article 3"];

    res.json({
      diagnosis: aiResult,
      articles: articles
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
