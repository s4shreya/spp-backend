const http = require('http');

const server = http.createServer((req, res) => {
    // console.log(req);
    // exits the process
    // process.exit();
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<body><p>Hello... this is my first backend code... so excited!!</p></html>');
    res.write('</html>');
    res.end();
});

server.listen(8080);