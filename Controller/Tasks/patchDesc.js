const Board = require("../../Models/Board");

const patchTaskDesc = async (req, reply) => {
    const { newDesc, taskID, boardID, listID } = req.body;
    try
    {
        const board = await Board.findOne({ _id: boardID });

        if (!board)
        {
            reply.code(404).send({ error: "Tableau introuvable. Rechargez la page." });
        }

        const lists = board.lists
        const listToUpdate = lists.find((list) => list._id === listID);
        const tasksUpdated = listToUpdate.tasks.map((task) => {
            if (task._id === taskID)
            {
                task.desc = newDesc;
            }
            return task;
        });
        listToUpdate.tasks = [...tasksUpdated];

        const updatedLists = lists.map((list) => {
            if (list._id === listToUpdate._id)
            {
                list = listToUpdate;
            }
            return list;
        });

        await board.updateOne({ _id: boardID }, { lists: updatedLists });

        const updatedBoard = await Board.findOne({ _id: boardID });
        const updatedBoards = await Board.find({ _id: boardID });

        reply.code(200).send({ board: updatedBoard, boards: updatedBoards });
    } catch (e)
    {
        reply.code(500).send({ error: "Une erreur est survenue sur le serveur." });
    }
};

module.exports = patchTaskDesc;