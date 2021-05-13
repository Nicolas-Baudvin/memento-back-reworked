const Board = require("../../Models/Board");
const createError = require("../../utils/errorCreator");

const createBoard = async (req, reply) => {
    const { title, image, _id, username } = req.body;
    console.log(username);

    if (req.validationError)
    {
        console.log(req.validationError.validation[0])
        const { params, keyword } = req.validationError.validation[0];
        const { statusCode, message } = createError(keyword, params.missingProperty);
        return reply.code(statusCode).send({ error: message });
    }

    try
    {
        const newBoard = new Board({
            title,
            image,
            owner: { username },
            ownerID: _id,
            lists: []
        });

        await newBoard.save();

        const ownerBoards = await Board.find({ ownerID: _id })

        reply.code(201).send({
            boards: ownerBoards,
        });
    } catch (e)
    {
        console.log(e);
        reply
            .code(500)
            .send({ e, error: "Une erreur est survenur avec le serveur." });
    }
};

module.exports = createBoard;