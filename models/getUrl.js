const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

async function getUrl(urlId) {
	const uri = process.env.DB_URI;
	const client = new MongoClient(uri, { useNewUrlParser: true });

	try {
		await client.connect();
		// DataBase - shorturl | Collection - urls
		const collection = client.db("shorturl").collection("urls");

		// search for an object that has the "short_url" property equal to the urlId
		const searchResult = await collection.findOne({ short_url: +urlId });

		if (!searchResult) return { error: "No short URL found for the given input" };
		else return { url: searchResult.original_url };
	} catch (error) {
		console.log(error);
	} finally {
		client.close();
	}
}

module.exports = { getUrl };
