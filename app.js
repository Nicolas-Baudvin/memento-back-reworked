const fastify = require('fastify');
const mongoose = require("mongoose");
const jwtCustomPlugin = require("./Plugin/auth");
const userRoutes = require("./Routes/user");
const boardRoutes = require("./Routes/board");
const listRoutes = require('./Routes/list');
const tasksRoutes = require("./Routes/tasks");
require("dotenv").config();


function build(opts = {}) {
    mongoose
        .connect(process.env.MONGO_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log("connected to mongo");
        })
        .catch((err) => {
            console.log("error : ", err);
        });


    const app = fastify({ logger: true, ...opts });

    app.register(require('fastify-cors'), {
        origin: (origin, cb) => {
            if (/localhost/.test(origin)) {
                cb(null, true)
                return
            }
            cb(new Error("Not Allowed"))
        }
    })

    app.register(jwtCustomPlugin).after(err => { if (err) throw err });
    app.register(userRoutes);
    app.register(boardRoutes);
    app.register(listRoutes);
    app.register(tasksRoutes);

    return app;
}

module.exports = build;