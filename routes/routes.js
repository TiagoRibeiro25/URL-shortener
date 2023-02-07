const express = require("express");
const { handleGetHello } = require("../controllers/handleGetHello.js");
const { handlePostShortUrl } = require("../controllers/handlePostShortUrl.js");
const { handleGetShortUrl } = require("../controllers/handleGetShortUrl.js");

const router = express.Router();

router.get("/hello", handleGetHello);

router.get("/shorturl/:shortUrl", handleGetShortUrl);

router.post("/shorturl", handlePostShortUrl);

module.exports = router;
