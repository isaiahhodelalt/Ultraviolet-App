import express from 'express';
import { createServer } from '@tomphttp/bare-server-node';
import { uvPath } from '@titaniumnetwork-dev/ultraviolet';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const bare = createServer('/bare/');

app.use(express.static(path.join(__dirname, '../public')));
app.use('/uv/', express.static(uvPath));

app.use((req, res, next) => {
  if (bare.shouldRoute(req)) {
    bare.route(req, res);
  } else {
    next();
  }
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Isaiah Ultraviolet running on port ${port}`);
});
