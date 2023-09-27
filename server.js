const http = require("http");
const fs = require('fs');

const server = http.createServer((req, res) => {
  // console.log(req);

  // exits the process
  // process.exit();
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form</body>'
    );
    res.write("</html>");
    return res.end();
  }

  if(url === '/message' && method === "POST") {
    const body = [];
    req.on('data', chunk => {
        console.log("chunk is ", chunk);
        body.push(chunk);
    });

    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        console.log("parsed body is ", parsedBody);
        const message = parsedBody.split("=")[1];
        fs.writeFileSync("message.txt", message);
    
        res.statusCode = 302;
        res.setHeader('location', '/');
        return res.end();
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write(
    "<body><p>Hello... this is my first backend code... so excited!!</p></body>"
  );
  res.write("</html>");
  res.end();
});

server.listen(8080);
