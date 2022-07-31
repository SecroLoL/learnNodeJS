const http = require('http');

// Create a server object. Server is an event emitter.
const server = http.createServer(function(req, res) {
    if (req.url == '/') {
        res.write("Hello world");
        res.end();
    }

    // handle different endPoint cases
    if (req.url == '/api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);

console.log("Listening on port 3000....");


