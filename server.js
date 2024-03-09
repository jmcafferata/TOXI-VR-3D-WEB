import express from 'express';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000; // Use the port provided by the environment or default to 3000

// Serve static files from the 'dist' directory (or 'public', depending on your build config)
app.use(express.static(path.join(__dirname, 'img')));

// Send your main HTML file in response to get requests on the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'img', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
