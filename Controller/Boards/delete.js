const Board = require("../../Models/Board");

const deleteBoard = async (req, reply) => {
    const { board, _id } = req.body;
    console.log(board);
    if (String(board.ownerID) !== String(_id))
        reply.code(403).send({
            error: "Vous n'avez pas l'autorisation de supprimer ce tableau",
        });

    try
    {
        await Board.deleteOne({ _id: board._id })

        const boardsUpdated = await Board.find({ ownerID: _id });

        reply.code(200).send({ boards: boardsUpdated });
    } catch (e)
    {
        console.log(e);
        reply.code(500).send({ error: "Une erreur est survenue avec le serveur. " });
    }
};

module.exports = deleteBoard;