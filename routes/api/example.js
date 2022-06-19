
const request = require("request");
const EnmapDatabase = require("../../database/EnmapDatabase");
const logger = require("../../Utils/logger");

// eslint-disable-next-line no-unused-vars
module.exports = function(express, app, endpoint) {
    const module = {};
    const router = express.Router();

    // list all database [key:values]
    router.get("/all", (req, res) => {
        const dbData = EnmapDatabase.basicTable.fetchEverything();
        const all = [];
        // eslint-disable-next-line no-unused-vars
        dbData.forEach((value, key) => {
            all.push({
                "key": `${key}`,
                "value": value
            });
        });
        res.json(JSON.parse(JSON.stringify(all)));
    });

    module.router = router;

    logger.log(`PATH: ${endpoint} successfully loaded.`);

    return module;
};