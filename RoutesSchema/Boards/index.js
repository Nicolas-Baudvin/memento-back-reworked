const { authHeaders } = require("../User");

exports.createBoardsBodySchema = {
    body: {
        type: "object",
        properties: {
            title: { type: "string" },
            image: { type: "object" },
            _id: { type: "string" },
            username: { type: "string" },
        },
        required: ["title", "image", "username"],
    },
    headers: authHeaders
};

exports.getBoardsBodySchema = {
    body: {
        type: "object",
        properties: {
            _id: { type: "string" },
            email: { type: "string" }
        },
        headers: authHeaders
    },
};

exports.deleteBoardsBodySchema = {
    body: {
        type: "object",
        properties: {
           board: { type: "object" },
           _id: { type: "string" } 
        }
    },
};
