const fs = require('fs');
const http = require('http');
const handler = require('./api/submit');

for (const file of ['.env.local', '.env']) {
  if (!fs.existsSync(file)) continue;

  for (const line of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([^#=]+?)\s*=\s*(.*)\s*$/);
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].replace(/^['"]|['"]$/g, '');
    }
  }
}

http.createServer((req, res) => {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (value) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(value));
  };
  handler(req, res);
}).listen(3000, () => {
  console.log('Backend listening on http://localhost:3000');
});