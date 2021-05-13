const createBoard = require("../Controller/Boards/create");
const deleteBoard = require("../Controller/Boards/delete");
const getBoards = require("../Controller/Boards/get");
const { createBoardsBodySchema, getBoardsBodySchema, deleteBoardsBodySchema } = require("../RoutesSchema/Boards");

const boardRoutes = (fastify, opts, next) => {
    /**
         * BOARD ROUTES
         * POST - /api/boards/create/
         */
    fastify.post(
        "/api/boards/create/",
        { schema: createBoardsBodySchema, attachValidation: true, preValidation: [fastify.authenticate] },
        createBoard
    );

    fastify.post(
        "/api/boards/get/",
        { schema: getBoardsBodySchema, preValidation: [fastify.authenticate] },
        getBoards
    );

    fastify.delete(
        "/api/boards/delete/",
        { schema: deleteBoardsBodySchema, preValidation: [fastify.authenticate] },
        deleteBoard
    );
    next();
};

module.exports = boardRoutes;