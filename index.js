// external dependencies
const express = require("./fake_node_modules/express");
const bodyParser = require("./fake_node_modules/bodyParser");
const logger = require("./fake_node_modules/logger");

// internal dependencies
const routeHandler = require("./routeHandler");

// initialize express app
const app = express();

// middlewares
app.use(logger);
app.use(bodyParser);

// route handlers
app.use("*", routeHandler);

// start the server
app.listen(3000);

app.fakeRequest("http://www.vincent.com");
