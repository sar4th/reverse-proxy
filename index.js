const fetch = require('node-fetch');

module.exports = async function ({ req, res, log }) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.send('', 204);
  }

  // Destructure query params
  const { path = 'movie/popular', ...queryParams } = req.query;

  // Always ensure page param exists
  if (!queryParams.page) {
    queryParams.page = '1';
  }

  // Build the query string
  const queryString = new URLSearchParams(queryParams).toString();

  // Construct the full TMDB URL
  const url = `https://api.themoviedb.org/3/${path}?${queryString}`;

  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${TMDB_API_TOKEN}`,
    },
  };

  try {
    log(`Calling TMDB: ${url}`);
    const response = await fetch(url, options);
    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('TMDB error:', error);
    return res.send('TMDB Fetch failed', 500);
  }
};
