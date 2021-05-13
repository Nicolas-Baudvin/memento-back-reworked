const Board = require("../../Models/Board");

const deleteList = async (req, reply) => {
    const { boardID, listID, _id } = req.body;
    try
    {
        const board = await Board.findOne({ _id: boardID });
        const lists = board.lists;
        const updatedLists = lists
            .filter((list) => list._id !== listID)
            .map((list, i) => {
                list.order = i;
                list._id = `${boardID}-${i}`;
                return list;
            });

        board.lists = updatedLists;

        const updatedBoard = await board.save();
        const updatedBoards = await Board.find({ ownerID: _id });

        reply.code(200).send({ board: updatedBoard, boards: updatedBoards });
    } catch (e)
    {
        reply.code(500).send({ error: "Une erreur est survenue avec le serveur." });
    }
};

module.exports = deleteList;