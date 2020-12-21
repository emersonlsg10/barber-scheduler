'use strict'
function formatResponse({ response, status = 200, msg = '', total = 0, data = [] }) {
    return response.status(status).send({
        status,
        msg,
        total,
        data,
    });
};

module.exports = formatResponse