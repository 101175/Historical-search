import express from 'express';
import wiki from 'wikijs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

// Serve static files (your index.html etc)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Search results page
app.get('/search', async (req, res) => {
  const query = req.query.q;
  try {
    const searchResults = await wiki().search(query);
    if (searchResults.results.length === 0) {
      res.send(`<h1>No results found for "${query}".</h1><a href="/">Back</a>`);
      return;
    }

    // Create list of clickable links to /page?title=...
    const resultsHtml = searchResults.results.slice(0, 10).map(title => {
      return `<li><a href="/page?title=${encodeURIComponent(title)}">${title}</a></li>`;
    }).join('');

    res.send(`
  <html>
    <head>
      <title>Search Results</title>
      <link rel="stylesheet" href="/index.css">
    </head>
    <body class="search-container">
      <h1>Search results for "${query}"</h1>
      <ul>
        ${searchResults.results.slice(0, 10).map(title => `
          <a class="result-link" href="/page?title=${encodeURIComponent(title)}">
            <div class="result-title">${title}</div>
          </a>
        `).join('')}
      </ul>
      <a href="/">Back</a>
    </body>
  </html>
`);
  } catch (error) {
    res.status(500).send('An error occurred: ' + error.message);
  }
});

// Page detail route
app.get('/page', async (req, res) => {
  const title = req.query.title;
  try {
    const page = await wiki().page(title);
    const summary = await page.summary();
    let imageUrl = '';

    try {
      const images = await page.images();
      // Pick a suitable image (skip SVGs and logos)
      imageUrl = images.find(img => /\.(jpg|jpeg|png|gif)$/i.test(img)) || '';
    } catch {
      // fallback no image
      imageUrl = '';
    }

    res.send(`
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="/index.css">
    </head>
    <body class="search-container">
      <div class="topic-summary">
        <a href="/search?q=${encodeURIComponent(title)}">← Back to results</a>
        <h1>${title}</h1>
        ${imageUrl ? `<img src="${imageUrl}" alt="${title}">` : ''}
        <p>${summary}</p>
      </div>

      <div class="other-topics">
        <h2>More on "${title.split(' ')[0]}"</h2>
        ${
          // Just show some alternative topic buttons (same term)
          searchResults.results.slice(1, 4).map(t =>
            `<a href="/page?title=${encodeURIComponent(t)}">${t}</a>`
          ).join('')
        }
      </div>

      <a href="/">🏠 Home</a>
    </body>
  </html>
`);
  } catch (error) {
    res.status(404).send(`Could not find page for "${title}". <a href="/">Home</a>`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});