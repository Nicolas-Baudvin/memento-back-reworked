const User = require("../../Models/User");
const bcrypt = require("bcrypt");
const createError = require("../../utils/errorCreator");

const createUser = async (req, reply) => {
    const { email, password, confPass, username } = req.body;

    if (req.validationError)
    {
        const { params, keyword } = req.validationError.validation[0];
        const { statusCode, message } = createError(keyword, params.missingProperty);
        return reply.code(statusCode).send({ error: message });
    }

    if (password !== confPass)
        reply.code(422).send({ error: "Les mots de passes sont différents" });

    try
    {
        const isUserExist = await User.findOne({ email });
        if (isUserExist)
            reply.code(409).send({ error: "Cette email existe déjà" });

        const hash = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hash,
            username
        });

        await newUser.save();
        reply.code(201).send({ message: "Votre compte a bien été créé." });
    } catch (err)
    {
        console.log(err);
        reply.code(500).send({ error: "Une erreur est survenue sur le serveur" });
    }
};

module.exports = createUser;