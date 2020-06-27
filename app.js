const cluster = require('cluster');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();

const errorMiddleware = require("./src/middleware/errorMiddleware"); //error Middlerware

const routes = require("./src/routes/routes"); //api-routes
if(cluster.isMaster) {
  var numWorkers = require('os').cpus().length;

  console.log('Master cluster setting up ' + numWorkers + ' workers...');

  for(var i = 0; i < numWorkers; i++) {
      cluster.fork();
  }

  cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');
  });

  cluster.on('exit', function(worker, code, signal) {
      console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
      console.log('Starting a new worker');
      cluster.fork();
  });
} else {
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/s3_upload", routes);

app.use(errorMiddleware); // error middleware

const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`App listening to ${PORT}....`);
  console.log("Press Ctrl+C to quit.");
});
}
