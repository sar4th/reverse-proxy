const fetch = require('node-fetch');

module.exports = async function ({ req, res, log, err }) {
  const path = req.query.path || 'movie/popular';
  const page = req.query.page || '1';

  const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN; // JWT Token
  const url = `https://api.themoviedb.org/3/${path}?page=${page}`;

  try {
    log(`Calling TMDB: ${url}`);
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TMDB_API_TOKEN}`,
        Accept: 'application/json',
      },
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('TMDB error:', error);
    return res.send('TMDB Fetch failed', 500);
  }
};
