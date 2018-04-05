const http = require('http');
const crypto = require('crypto');
const smparser = require('./smParser');
const smencoder = require('./smEncoder');
// Create an HTTP server
const srv = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});
srv.on('upgrade', (req, socket, head) => {
//  console.log(req);
  //console.log(req.headers);
  //console.log("jksj");
  //console.log(req.headers["sec-websocket-key"]);
  var hash = crypto.createHash('sha1');
  hash.update(`${req.headers['sec-websocket-key']}258EAFA5-E914-47DA-95CA-C5AB0DC85B11`);
  var webSocketKey = hash.digest('base64');
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               `Sec-WebSocket-Accept: ${webSocketKey}\r\n`+
               '\r\n');
   socket.on('data', (chunk) => {
        var parsemsg ;
       console.log(chunk.toString())
       parsemsg = smparser(chunk) ;
       console.log(parsemsg);
       socket.write(Buffer.from(smencoder("jiii")),'utf8');
                  });

  //socket.pipe(socket); // echo back\
});

srv.listen(8080, () => {console.log("listening on port 8080")});
