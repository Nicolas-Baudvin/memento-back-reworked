const Board = require("../../Models/Board");

const getCurrentDate = () => {
    const date = new Date();
    const d = date.getDate();
    const m = date.getMonth() + 1;
    const y = date.getFullYear();

    return `${d < 10 ? "0" + d : d}/${m < 10 ? "0" + m : m}/${y}`;
};

const createTask = async (req, reply) => {
    const { desc, list: listSource, boardID, _id } = req.body;
    try
    {
        const board = await Board.findOne({ _id: boardID });

        if (!board)
        {
            reply.code(404).send({ error: "Tableau introuvable." });
        }

        let lists = board.lists;
        const listToUpdate = lists.find((list) => list._id === listSource._id);
        if (listToUpdate.tasks.length)
        {
            listToUpdate.tasks.push({
                desc,
                importance: false,
                date: getCurrentDate(),
                author: "",
                order: listToUpdate.tasks.length,
                _id: `${listSource._id}-${listToUpdate.tasks.length}`,
            });
        } else
        {
            listToUpdate.tasks = [
                {
                    desc,
                    importance: false,
                    date: getCurrentDate(),
                    author: "",
                    order: 0,
                    _id: `${listSource._id}-0`,
                },
            ];
        }

        lists = lists.map((list) => {
            if (list._id === listToUpdate._id)
            {
                list = listToUpdate;
            }
            return list;
        });

        const boardUpdated = await Board.updateOne({ _id: boardID }, { lists: [...lists] });
        const boards = await Board.find({ ownerID: _id });

        reply.code(200).send({ board: boardUpdated, boards });
    } catch (e)
    {
        console.log("Error", e);
        reply.code(500)
            .send({ error: "Une erreur est survenue sur le serveur." });
    }
};

module.exports = createTask;