const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

async function postUrl(urlObj) {
	const uri = process.env.DB_URI;
	const client = new MongoClient(uri, { useNewUrlParser: true });

	try {
		await client.connect();
		// DataBase - shorturl | Collection - urls
		const collection = client.db("shorturl").collection("urls");

		// check if there's already a short_url for this url
		const searchResult = await collection.findOne({ original_url: urlObj.original_url });
		if (searchResult) {
			return {
				original_url: searchResult.original_url,
				short_url: searchResult.short_url,
			};
		}

		// get the last short_url
		const lastShortUrl = await collection.findOne({}, { sort: { short_url: -1 } });
		urlObj.short_url = lastShortUrl ? lastShortUrl.short_url + 1 : 1;

		// insert the new urlObj
		await collection.insertOne(urlObj);
		return { original_url: urlObj.original_url, short_url: urlObj.short_url };
	} catch (error) {
		console.log(error);
		return { error: "Error while submitting the url" };
	} finally {
		client.close();
	}
}

module.exports = { postUrl };
