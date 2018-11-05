
const http = require('http');
// THIS IS FOR AUTOMATICLY REFRESH SERVE ! - NODEMON !#@

const debug = require("debug")("node-angular");
const app = require('./backend/app');


const hostname = '127.0.0.1';
const port = 3000;

app.set('port', port);
const server = http.createServer(app);



server.listen(port, hostname, ()=>{
  console.log(`SERVER START ON PORT  : ${port}`)

});




// ERROR ZONE !#@
const onError = error => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "pipe " + port : "port " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

server.on("error", onError);



