const createUser = require("../../Controller/User/create");

exports.createUserSchema = {
    method: "POST",
    url: "/api/users/create/",
    schema: {
        body: {
            type: "object",
            properties: {
                username: { type: "string" },
                email: { type: "string" },
                confPass: { type: "string" },
                password: { type: "string" },
            },
            required: ["username", "email", "confPass", "password"],
        },
        response: {
            200: {
                type: "object",
                properties: {
                    message: { type: "string" }
                }
            }
        }
    },
    attachValidation: true,
    handler: createUser,
};

exports.authUserSchema = {
    body: {
        type: "object",
        properties: {
            email: { type: "string" },
            password: { type: "string" }
        },
        required: ["email", "password"],
    }
};

exports.authHeaders = {
    type: "object",
    properties: {
        "authorization": { type: "string" },
    },
};

exports.deleteUserSchema = {
    body: {
        type: "object",
        properties: {
            email: { type: "string" },
            _id: { type: "string" }
        },
        required: ["email", "_id"],
    },
    response: {
        200: {
            type: "object",
            properties: {
                message: { type: "string" },
            }
        }
    },
    headers: this.authHeaders
};

