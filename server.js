const server = require("./app")({
    logger: {
        level: 'info',
        prettyPrint: true
    }
});

server.listen(5000, (err, address) => {
    if (err)
    {
        console.log(err)
        process.exit(1)
    }
})