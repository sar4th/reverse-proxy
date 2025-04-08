const fetch = require('node-fetch');

module.exports = async function ({ req, res }) {
  const path = req.query.path || 'movie/popular';
  const page = req.query.page || '1';

  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/${path}?api_key=${TMDB_API_KEY}&page=${page}`;

  try {
    const response = await fetch(url);
  log(`Calling TMDB: ${url}`);
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('TMDB error:', err);
    return res.send('TMDB Fetch failed', 500);
  }
};
