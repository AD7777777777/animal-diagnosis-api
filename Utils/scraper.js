const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeSymptoms(query) {
  const searchUrl = `https://www.petmd.com/search?query=${encodeURIComponent(query)}`;

  try {
    const { data } = await axios.get(searchUrl);
    const $ = cheerio.load(data);

    const results = [];

    $('.search-result-title').each((i, el) => {
      const title = $(el).text().trim();
      const link = 'https://www.petmd.com' + $(el).find('a').attr('href');
      results.push({ title, link });
    });

    return results.slice(0, 3); // Return first 3 articles
  } catch (error) {
    console.error(error);
    return [];
  }
}

module.exports = scrapeSymptoms;
