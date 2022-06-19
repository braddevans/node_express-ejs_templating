const EnmapDatabase = require("../../database/EnmapDatabase");
const logger = require("../../Utils/logger");

// eslint-disable-next-line no-unused-vars
module.exports = function(express, app, endpoint) {
    const module = {};
    const router = express.Router();

    router.get("/", (req, res) => {
        res.render('pages/index',{
            index_data: {}
        });
    });

    module.router = router;

    logger.log(`PATH: ${endpoint} successfully loaded.`);

    return module;
};