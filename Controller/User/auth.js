const User = require("../../Models/User");
const createError = require("../../utils/errorCreator");
const bcrypt = require("bcrypt");

const userAuth = async (req, reply, fastify) => {
    const { email, password } = req.body;

    if (req.validationError)
    {
        const { params, keyword } = req.validationError.validation[0];
        const { statusCode, message } = createError(keyword, params.missingProperty);
        return reply.code(statusCode).send({ error: message });
    }

    try
    {
        const user = await User.findOne({ email })

        if (!user)
            reply.code(404).send({ error: "Identifiants incorrects" });

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid)
        {
            reply.code(403).send({ error: "Identifiants incorrects" });
        }

        const token = fastify.jwt.sign({ email: user.email, _id: user._id });

        reply.code(200).send({
            token,
            email: user.email,
            username: user.username,
            _id: user._id,
            message: "Vous êtes connétés."
        });
    } catch (e)
    {
        console.log(e);
        reply.code(500).send({ error: createError(500, "server") });
    }
};

module.exports = userAuth;