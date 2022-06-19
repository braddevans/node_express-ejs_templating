if (Number(process.version.slice(1).split(".")[0]) < 16) throw new Error("Node 16.x or higher is required. Update Node on your system.");
require("dotenv").config();
const schedule = require("node-schedule");
const {readdirSync} = require("fs");
const logger = require("./Utils/logger.js");
const express = require("express");
const db = require("./database/EnmapDatabase");
const app = express();

app.appDir = __dirname

const runEvery = async () => {
    // eslint-disable-next-line no-unused-vars
    logger.log("[runEvery] setting up schedule (0 * * * *) at 0 mins past the hour");
    const j = schedule.scheduleJob("0 * * * *", async function() {
        // todo: setup tests to be run every hour
        logger.log("[runEvery] Next run time: " + j.nextInvocation());
    });
    logger.log("[runEvery] Next run time: " + j.nextInvocation());
};

app.use(express.json());
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

// controller setup
const RoutesController = require("./Controllers/Routes.Controller");
RoutesController.setupRoutes(express, app);

app.listen(9000, "0.0.0.0", () => logger.log("Node.js server started on port 9000."));

runEvery().then();