const { createUserSchema, authUserSchema, deleteUserSchema } = require("../RoutesSchema/User");
const deleteUser = require("../Controller/User/delete");
const userAuth = require("../Controller/User/auth");

const userRoutes = async (fastify, opts, next) => {

    fastify.route(createUserSchema);

    fastify.post(
        "/api/user/auth/",
        { schema: authUserSchema, attachValidation: true },
        (req, reply) => userAuth(req, reply, fastify)
    );

    fastify.delete(
        "/api/users/delete/",
        { schema: deleteUserSchema, attachValidation: true, preValidation: [fastify.authenticate] },
        deleteUser
    );

    next();
}

module.exports = userRoutes;