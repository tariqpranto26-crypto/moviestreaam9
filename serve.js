const http = require("http");
const fs = require("fs");
const path = require("path");
const root = __dirname;
const mime = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".ico": "image/x-icon" };
const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
  let f = path.join(root, urlPath === "/" ? "index.html" : urlPath.slice(1));
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
  if (fs.existsSync(f) && fs.statSync(f).isFile()) {
    const ct = mime[path.extname(f).toLowerCase()] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": ct });
    fs.createReadStream(f).pipe(res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});
server.listen(8000, () => console.log("Serving on http://localhost:8000"));
