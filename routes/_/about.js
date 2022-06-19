
const request = require("request");
const EnmapDatabase = require("../../database/EnmapDatabase");
const logger = require("../../Utils/logger");

// eslint-disable-next-line no-unused-vars
module.exports = function(express, app, endpoint) {
    const module = {};
    const router = express.Router();

    // list all database [key:values]
    router.get("/about/", (req, res) => {
        res.render('pages/about',{
            about_data: {}
        });
    });

    module.router = router;

    logger.log(`PATH: ${endpoint} successfully loaded.`);

    return module;
};