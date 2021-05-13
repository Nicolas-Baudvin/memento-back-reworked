const Board = require("../../Models/Board");

const getBoards = async (req, reply) => {
    const { _id } = req.body;
    try
    {
        const userBoards = await Board.find({ ownerID: _id })
        if (!userBoards.length)
        {
            reply.code(404).send({ error: "Vous n'avez encore aucun tableau" });
        }

        console.log("userBoards : ", userBoards);
        await reply.code(200).send({ boards: userBoards });
    } catch (e)
    {
        console.log(e);
        reply.code(500).send({ error: "Une erreur est survenue sur le serveur." });
    }
};

module.exports = getBoards;