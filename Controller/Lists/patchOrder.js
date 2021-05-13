const Board = require("../../Models/Board");

const patchListOrder = async (req, reply) => {
    const { listsUpdated, _id, boardID } = req.body;

    try
    {
        const board = await Board.findOne({ _id: boardID });

        if (!board)
        {
            reply.code(404).send(
                {
                    error:
                        "Tableau introuvable. Rechargez la page ou contactez un administrateur.",
                }
            );
        }

        board.lists = listsUpdated;

        const updatedBoard = await board.save();
        const boards = await Board.find({ ownerID: _id });

        reply.code(200).send({ board: updatedBoard, boards });
    } catch (e)
    {
        reply.code(500).json(
            {
                error:
                    "Une erreur est survenue sur le serveur. Contactez un administrateur",
            }
        );
    }
};

module.exports = patchListOrder;