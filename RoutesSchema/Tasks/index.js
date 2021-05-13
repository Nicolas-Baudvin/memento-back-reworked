const { authHeaders } = require("../User");

exports.createTasksBodySchema = {
    body: {
        type: "object",
        properties: {
            desc: { type: "string", },
            list: { type: "object" },
            boardID: { type: "string" },
            _id: { type: "string" },
        },
        required: ["desc"],
    },
    headers: authHeaders
};