const { authHeaders } = require("../User");

exports.createTaskBodySchema = {
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

exports.deleteTaskBodySchema = {
    body: {
        type: "object",
        properties: {
            taskID: { type: "string" },
            boardID: { type: "string" },
            listID: { type: "string" },
        },
    },
    headers: authHeaders
};

exports.patchTaskImportanceBodySchema = {
    body: {
        type: "object",
        properties: {
            taskID: { type: "string" },
            boardID: { type: "string" },
            listID: { type: "string" },
            importance: { type: "boolean" },
        },
    },
    headers: authHeaders
}

exports.patchTaskDescBodySchema = {
    body: {
        type: "object",
        properties: {
            taskID: { type: "string" },
            boardID: { type: "string" },
            listID: { type: "string" },
            newDesc: { type: "string" },
        },
    },
    headers: authHeaders
}

exports.patchTaskAuthorBodySchema = {
    body: {
        type: "object",
        properties: {
            taskID: { type: "string" },
            boardID: { type: "string" },
            listID: { type: "string" },
            author: { type: "string" },
        },
    },
    headers: authHeaders
}

exports.patchTasksOrderBodySchema = {
    body: {
        type: "object",
        properties: {
            sourceList: { type: "object" },
            boardID: { type: "string" },
            tasks: { type: "array" },
        }
    },
    headers: authHeaders
};