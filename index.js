const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;
const process = require("process");
require('dotenv').config()

const PORT = process.env.PORT || 8000;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  /** @doc Fork workers. */
  for (let i = 0; i < numCPUs; i++) cluster.fork();

  cluster.on("exit", (worker, code, signal) =>
    console.log(`worker ${worker.process.pid} died`)
  );
} else {
  /** @doc Workers can share any TCP connection */
  /** @doc In this case it is an HTTP server */
  http.createServer(require("./app")).listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server Up and Running => ${PORT}`);
  });

  console.log(`Worker ${process.pid} started`);
}