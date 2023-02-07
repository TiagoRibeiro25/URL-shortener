const { postUrl } = require("../models/postUrl");

async function handlePostShortUrl(req, res) {
	const url = req.body.url;

	if (!validateURL(url)) {
		res.json({ error: "Invalid URL" });
		return;
	}

	const urlObj = { original_url: req.body.url, date: Date.now() };

	const result = await postUrl(urlObj);
	res.json(result.error ? { error: result.error } : result);
}

function validateURL(url) {
	const pattern = new RegExp(
		"^(https?:\\/\\/)" + // protocol
			"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
			"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
			"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
			"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
			"(\\#[-a-z\\d_]*)?$",
		"i"
	);
	return pattern.test(url);
}

module.exports = { handlePostShortUrl };
