const createTask = require("../Controller/Tasks/create");
const deleteTask = require("../Controller/Tasks/delete");
const patchTaskAuthor = require("../Controller/Tasks/patchAuthor");
const patchTaskDesc = require("../Controller/Tasks/patchDesc");
const patchTaskImportance = require("../Controller/Tasks/patchImportance");
const patchTasksOrder = require("../Controller/Tasks/patchOrder");
const { createTaskBodySchema, deleteTaskBodySchema, patchTaskDescBodySchema, patchTaskImportanceBodySchema, patchTasksOrderBodySchema, patchTaskAuthorBodySchema } = require("../RoutesSchema/Tasks");

const tasksRoutes = (fastify, opts, next) => {
    fastify.post(
        "/api/tasks/create/",
        { schema: createTaskBodySchema, attachValidation: true, preValidation: [fastify.authenticate] },
        createTask
    );

    fastify.delete(
        "/api/tasks/delete/",
        { schema: deleteTaskBodySchema, preValidation: [fastify.authenticate] },
        deleteTask
    );

    fastify.patch(
        "/api/tasks/patch/desc/",
        { schema: patchTaskDescBodySchema, attachValidation: true, preValidation: [fastify.authenticate] },
        patchTaskDesc
    );

    fastify.patch(
        "/api/tasks/patch/importance/",
        { schema: patchTaskImportanceBodySchema, preValidation: [fastify.authenticate] },
        patchTaskImportance
    );

    fastify.patch(
        "/api/tasks/patch/order/",
        { schema: patchTasksOrderBodySchema, preValidation: [fastify.authenticate] },
        patchTasksOrder
    );

    fastify.patch(
        "/api/tasks/patch/author/",
        { schema: patchTaskAuthorBodySchema, preValidation: [fastify.authenticate] },
        patchTaskAuthor
    );
    
    next();
};

module.exports = tasksRoutes;