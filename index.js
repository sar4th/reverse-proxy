const fetch = require('node-fetch');
module.exports = async function ({ req, res, log }) {
  // Set all CORS headers for every response
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.send('', 204, corsHeaders);
  }
  
  // Extract the 'path' and all other query parameters from the request.
  // Decode the 'path' to restore any URL-encoded characters.
  const { path: encodedPath, ...otherParams } = req.query;
  const path = encodedPath ? decodeURIComponent(encodedPath) : 'movie/popular';
  
  // Build query string from all the other query parameters
  const queryParams = new URLSearchParams(otherParams).toString();
  
  // Construct the TMDB API URL
  const url = `https://api.themoviedb.org/3/${path}?${queryParams}`;
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
    return res.json(data, corsHeaders);
  } catch (error) {
    console.error('TMDB error:', error);
    return res.send('TMDB Fetch failed', 500, corsHeaders);
  }
};
