const { createListBodySchema, deleteListsBodySchema, pathListOrderBodySchema, patchListTitleBodySchema } = require("../RoutesSchema/Lists");
const createList = require("../Controller/Lists/create");
const deleteList = require("../Controller/Lists/delete");
const patchListOrder = require("../Controller/Lists/patchOrder");
const patchListTitle = require("../Controller/Lists/patchTitle");

const listRoutes = (fastify, opts, next) => {
    fastify.post(
        "/api/lists/create/",
        { schema: createListBodySchema, attachValidation: true, preValidation: [fastify.authenticate] },
        createList
    );

    fastify.delete(
        "/api/lists/delete/",
        { schema: deleteListsBodySchema, preValidation: [fastify.authenticate] },
        deleteList
    );

    fastify.patch(
        "/api/lists/patch/order/",
        { schema: pathListOrderBodySchema, preValidation: [fastify.authenticate] },
        patchListOrder
    );

    fastify.patch(
        "/api/lists/patch/title/",
        { schema: patchListTitleBodySchema, preValidation: [fastify.authenticate], attachValidation: true },
        patchListTitle
    )

    next();
};

module.exports = listRoutes;