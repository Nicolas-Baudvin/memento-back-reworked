const fp = require("fastify-plugin")

function jwtCustomPlugin (fastify, opts, next) {
    fastify.register(require("fastify-jwt"), {
        secret: process.env.TOKEN_KEY
    })

    fastify.decorate("authenticate", async function (request, reply) {
        const { _id } = request.body;
        const token = request.headers.authorization.split(" ")[1];
        if (!token || !_id)
        {
            reply.code(403).send({ error: "Accès interdit." });
        }
        try
        {
            const decoded = await fastify.jwt.verify(token);
            if (decoded._id !== _id)
            {
                reply.code(403).send("Accès interdit.");
            }
        } catch (err)
        {
            reply.send(err);
        }
    });
    next();
}

module.exports = fp(jwtCustomPlugin, { fastify: '>=1.0.0'});

