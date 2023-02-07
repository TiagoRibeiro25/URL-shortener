function handleGetHello(req, res) {
   res.json({ greeting: "hello API" });
}

module.exports = { handleGetHello };
