const { true } = require("tap");
const createTask = require("../Controller/Tasks/create");
const { createTasksBodySchema } = require("../RoutesSchema/Tasks");

const tasksRoutes = (fastify, opts, next) => {
    fastify.post(
        "/api/tasks/create/",
        { schema: createTasksBodySchema, attachValidation: true, preValidation: [fastify.authenticate] },
        createTask
    );
    
    next();
};

module.exports = tasksRoutes;