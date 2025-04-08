const sdk = require("node-appwrite");
const axios = require("axios");

module.exports = async function(req, res) {
	const TMDB_API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NDUxZTYxZGEyNjYzMTE1MWFkODhmYjQwMjI1OWE4ZCIsIm5iZiI6MTc0Mjg3NzY1My42ODUsInN1YiI6IjY3ZTIzM2Q1N2RiOWU3MGM0N2RjNjRkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.AmDrjBZD9EGqt50TnFqHspV1s9bhATVNNjBB7L1Kh34"

	const path = req.query?.path || "movie/popular";

	const query = req.query || {};
	delete query.path;

	  try {
    // Call the TMDB endpoint using axios
    const response = await axios.get(`https://api.themoviedb.org/3/${path}`, {
      params: { ...query, api_key: TMDB_API_KEY },
    });
    // Return the data received from TMDB
    res.json(response.data);
  } catch (err) {
    // In case of error, send a JSON error response
    res.json(
      {
        error: "Failed to fetch from TMDB",
        details: err.message,
      },
      500
    );
  }
};
