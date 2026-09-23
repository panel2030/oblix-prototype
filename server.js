const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const chunkDir = path.join(__dirname, "chunks");
const html = fs.readdirSync(chunkDir)
  .filter(f => /^part-\d+\.txt$/.test(f))
  .sort()
  .map(f => fs.readFileSync(path.join(chunkDir, f), "utf8"))
  .join("");

const server = http.createServer((req,res) => {
  if (req.url === "/health") {
    res.writeHead(200, {"Content-Type":"application/json","Cache-Control":"no-store"});
    return res.end(JSON.stringify({status:"ok",service:"oblix-prototype"}));
  }
  if (req.url === "/" || req.url === "/index.html") {
    res.writeHead(200, {"Content-Type":"text/html; charset=utf-8","Cache-Control":"no-store"});
    return res.end(html);
  }
  res.writeHead(404, {"Content-Type":"text/plain; charset=utf-8"});
  res.end("Not found");
});
server.listen(PORT, "0.0.0.0", () => console.log(`Oblix prototype listening on ${PORT}`));
