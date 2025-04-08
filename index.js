const sdk = require("node-appwrite");
const axios = require("axios");

module.exports = async function(req, res) {
	const TMDB_API_KEY = process.env.TMDB_API_KEY;

	const path = req.query?.path || "movie/popular";

	const query = req.query || {};
	delete query.path;

	try {
		const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
			params: { ...query, api_key: TMDB_API_KEY },
		});
		res.json(response.data);
	} catch (err) {
		res.json(
			{
				error: "Failed to fetch from TMDB",
				details: err.message,
			},
			500,
		);
	}
};
