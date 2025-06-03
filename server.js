import express from 'express';
import wiki from 'wikijs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Setup to serve the HTML
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public'))); // put the HTML file in a 'public' folder

// Handle search
app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const searchResults = await wiki().search(query);
    const summaries = [];

    for (const title of searchResults.results.slice(0, 5)) {
      const page = await wiki().page(title);
      const summary = await page.summary();
      summaries.push({ title, summary });
    }

    res.send(`
      <h1>Search results for "${query}"</h1>
      <ul>
        ${summaries.map(s => `<li><strong>${s.title}</strong><p>${s.summary}</p></li>`).join('')}
      </ul>
      <a href="/">🔙 Back</a>
    `);
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});