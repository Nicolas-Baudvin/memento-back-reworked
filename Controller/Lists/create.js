const Board = require("../../Models/Board");

const createList = async (req, reply) => {
    const { title, color, boardID, _id } = req.body;

    if (req.validationError)
    {
        const { params, keyword } = req.validationError.validation[0];
        const { statusCode, message } = createError(keyword, params.missingProperty);
        return reply.code(statusCode).send({ error: message });
    }

    try
    {
        const board = await Board.findOne({ _id: boardID });

        if (!board)
        {
            reply.code(404).send({ error: "Tableau introuvable." });
        }

        board.lists = board.lists
            ? [
                ...board.lists,
                {
                    title,
                    color,
                    order: board.lists.length,
                    tasks: [],
                    _id: `${boardID}-${board.lists.length + 1}`,
                },
            ]
            : [{ title, color, order: 0, tasks: [], _id: `${boardID}-1` }];

        const updatedBoard = await board.save();
        const updatedBoards = await Board.find({ ownerID: _id });

        reply.code(200).send({ board: updatedBoard, boards: updatedBoards });
    } catch (e)
    {
        reply.code(500).send({ error: "Une erreur est survenue avec le serveur." });
    }
};

module.exports = createList;