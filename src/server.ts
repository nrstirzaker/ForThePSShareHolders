import express from 'express';
import { createHandler } from '../.netlify/build/entry.mjs';

const app = express();
// Change this based on your astro.config.mjs, `base` option.
// They should match. The default value is "/".
const base = '/';
app.use(base, express.static('dist/client/'));
app.use(createHandler);

app.listen(8080);
