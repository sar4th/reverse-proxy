const sdk = require("node-appwrite");
const axios = require("axios");

module.exports = async function (req, res) {
  // Your TMDB API key is stored in an environment variable
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  // Get the endpoint path from query parameters
  // Default to "movie/popular" if not provided
  const path = req.query?.path || "movie/popular";

  // Copy all query parameters
  const query = req.query || {};
  // Remove the 'path' parameter so that it is not sent to TMDB
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
      500,
    );
  }
};
