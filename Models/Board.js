const mongoose = require("mongoose");

const BoardsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    owner: { type: Object, required: true },
    image: { type: Object, required: true },
    ownerID: { type: String, required: true },
    lists: { type: Array, required: true }
});

const Boards = mongoose.model("Tabs", BoardsSchema);

module.exports = Boards;