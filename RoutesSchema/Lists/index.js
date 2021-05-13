const { authHeaders } = require("../User");

exports.createListBodySchema = {
    body: {
        type: "object",
        properties: {
            title: { type: "string" },
            color: { type: "string" },
            boardID: { type: "string" },
            _id: { type: "string" },
        },
        required: ["title", "color"],
    },
    headers: authHeaders
};

exports.deleteListsBodySchema = {
    body: {
        type: "object",
        properties: {
            boardID: { type: "string"},
            listID: { type: "string" },
            _id: { type: "string" },
        }
    },
    headers: authHeaders
};

exports.pathListOrderBodySchema = {
    body: {
        type: "object",
        properties: {
            listUpdated: { type: "object" },
            _id: { type: "string" },
            boardID: { type: "string" },
        }
    },
    headers: authHeaders,
};

exports.patchListTitleBodySchema = {
    body: {
        type: "object",
        properties: {
            list: { type: "object" },
            newTitle: { type: "string" },
            _id: { type: "string" },
            boardID: { type: "string" }
        },
        required: ["newTitle"]
    },
    headers: authHeaders
}