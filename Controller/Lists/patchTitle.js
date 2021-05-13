const Board = require("../../Models/Board");
const createError = require("../../utils/errorCreator");

const patchListTitle = async (req, reply) => {
    const { list: listData, newTitle, _id, boardID } = req.body;

    if (req.validationError)
    {
        console.log(req.validationError.validation[0]);
        const { params, keyword } = req.validationError.validation[0];
        const { statusCode, message } = createError(keyword, params.missingProperty);
        return reply.code(statusCode).send({ error: message });
    }

    try
    {
        const board = await Board.findOne({ _id: boardID })

        if (!board)
        {
            reply.code(404).send({ error: "Liste introuvable. (rechargez la page)" });
        }

        const updatedLists = board.lists.map((list) => {
            if (list._id === listData._id)
            {
                list.title = newTitle;
            }
            return list;
        });
        
        board.lists = [...updatedLists];

        await Board.updateOne({ _id: boardID }, { lists: [...updatedLists] });

        const updatedBoard = await Board.findOne({ _id: boardID });
        const updatedBoards = await Board.find({ ownerID: _id });

        reply.code(200).send({ board: updatedBoard, boards: updatedBoards });
    } catch (e)
    {
        console.log(e);
        reply.code(500).send({ error: "Une erreur est survenue avec le serveur." });
    }
};

module.exports = patchListTitle;