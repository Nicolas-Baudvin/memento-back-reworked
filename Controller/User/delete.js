const User = require("../../Models/User");
const createError = require("../../utils/errorCreator");

const deleteUser = async (req, reply) => {
    const { email, _id } = req.body;
    console.log(req.user);
    

    if (req.validationError)
    {
        const { params, keyword } = req.validationError.validation[0];
        const { statusCode, message } = createError(keyword, params.missingProperty);
        return reply.code(statusCode).send({ error: message });
    }
    try
    {
        const user = await User.findOne({ _id, email });

        if (!user)
            return reply.code(404)
                .send({ error: "Aucun utilisateur trouvée, déconnexion" });

        await user.delete();

        return reply.code(200).send({ message: "Votre compte a bien été supprimé." });
    } catch (e)
    {
        console.log(e);
        return reply.code(500)
            .send({
                error:
                    "Une erreur est survenue sur le serveur, veuillez contacter l'administrateur.",
            });
    }
};

module.exports = deleteUser;