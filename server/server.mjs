import express from 'express';
import { fileURLToPath } from 'url';
// import { createRequestHandler } from '@sveltejs/kit'

//we utilize the fileURLToPath function from the url module to convert the import.meta.url to the corresponding file path. 
import { dirname, resolve } from 'path';
import compression from 'compression';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//we extract the directory name using the dirname function from the path module

const app = express();
const port = process.env.PORT || 3000;

// Enable compression middleware for better performance
app.use(compression());

// const requestHandler = createRequestHandler({
//   // Specify your Sveltekit app configuration options here
//   // For example, you can set the `appDir` and `amp` options
//   // based on your project requirements.
// });

// app.use(requestHandler);


// Serve static assets (compiled SvelteKit files)
app.use(express.static(resolve(__dirname, '../src')));

// Handle all routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(resolve(__dirname, '../src/app.html'));
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
