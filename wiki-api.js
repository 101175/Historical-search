import wiki from 'wikijs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a historical topic to search: ', async (searchTerm) => {
  try {
    const searchResults = await wiki().search(searchTerm);
    if (searchResults.results.length === 0) {
      console.log('No results found.');
    } else {
      console.log(`Top results for "${searchTerm}":`);
      for (const title of searchResults.results.slice(0, 5)) {
        const page = await wiki().page(title);
        const summary = await page.summary();
        console.log(`\n📘 ${title}\n${summary}\n`);
      }
    }
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    rl.close();
  }
});