const { getUrl } = require("../models/getUrl");

async function handleGetShortUrl(req, res) {
	const urlId = req.params.shortUrl;

	const result = await getUrl(urlId);

	if (result.url) res.redirect(result.url);
	else res.json(result);
}

module.exports = { handleGetShortUrl };
