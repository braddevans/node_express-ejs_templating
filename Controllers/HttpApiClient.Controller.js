"use strict";

const http = require("http");
const HttpApiClientController = {};

/**
 * Send a Get Request to Items specified using the example code below
 * @param options
 * @returns {Promise<unknown>}
 */
HttpApiClientController.apiHttpGetRequest = ({...options}) => {
    return new Promise((resolve, reject) => {
        const req = http.request({
            method: "GET",
            ...options,
        }, res => {
            const chunks = [];
            res.on("data", data => chunks.push(data));
            res.on("end", () => {
                let resBody = Buffer.concat(chunks);
                switch (res.headers["content-type"]) {
                    case "application/json":
                        resBody = JSON.parse(resBody);
                        break;
                }
                resolve(resBody);
            });
        });
        req.on("error", reject);
        req.end();
    });
};


/**
 * Send a Post Request with a body to Items specified using the example code below
 *
 * @param body
 * @param options
 * @returns {Promise<unknown>}
 */
HttpApiClientController.apiHttpPostRequest = ({body, ...options}) => {
    return new Promise((resolve, reject) => {
        const req = http.request({
            method: 'POST',
            ...options,
        }, res => {
            const chunks = [];
            res.on('data', data => chunks.push(data))
            res.on('end', () => {
                let resBody = Buffer.concat(chunks);
                switch (res.headers['content-type']) {
                    case 'application/json':
                        resBody = JSON.parse(resBody);
                        break;
                }
                resolve(resBody)
            })
        })
        req.on('error', reject);
        if (body) {
            req.write(body);
        }
        req.end();
    })
};


/**
 * Function for posting to a specified endpoint on a specified server,
 * will stringify the body parameter on execution,
 * in return it will be receiving Chunked Output back in which the above promise will turn it into a full response.
 * @param baseurl
 * @param port
 * @param path
 * @param body
 * @returns {Promise<unknown>}
 */
HttpApiClientController.postEndpoint = async (baseurl, port, path, body) => {
    return await HttpApiClientController.apiHttpPostRequest(
        {
            hostname: baseurl,
            port: port,
            path: path,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
};

/**
 * Will do a Http GET request to a specified endpoint on a specified server,
 * in return it will be receiving Chunked Output back in which the above promise will turn it into a full response.
 * @param baseurl
 * @param port
 * @param path
 * @returns {Promise<unknown>}
 */
HttpApiClientController.getEndpoint = async (baseurl, port, path) => {
    return await HttpApiClientController.apiHttpGetRequest(
        {
            hostname: baseurl,
            port: port,
            path: path,
            headers: {
                'Content-Type': 'application/json',
            },
        });
};

//+===============+
//+   Examples    +
//+===============+

/*
const examplePostRequest = await HttpApiClientController.apiHttpPostRequest(
    {
        hostname: endpoints.gateway,
        port: endpoints.gatewayPort,
        path: endpoints.examplePostRequestEndpoint,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"example": true})
    });
logger.log(examplePostRequest)
*/


/*
const exampleGetRequest = await HttpApiClientController.apiHttpGetRequest(
{
    hostname: endpoints.gateway,
    port: endpoints.gatewayPort,
    path: endpoints.exampleGetRequestEndpoint,
    headers: {
        'Content-Type': 'application/json',
    },
});
*/

module.exports = HttpApiClientController;