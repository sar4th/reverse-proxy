const fetch = require('node-fetch');
module.exports = async function ({ req, res, log, err }) {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.send('', 204);
  }
  const path = req.query.path || 'movie/popular';
  const page = req.query.page || '1';
  const TMDB_API_TOKEN =process.env.TMDB_API_TOKEN
  const url = https://api.themoviedb.org/3/${path}?page=${page};
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: Bearer ${TMDB_API_TOKEN}
    }
  };
 
  try {
    log(Calling TMDB: ${url});
    
    // Method 1: Using async/await
    const response = await fetch(url, options);
    const data = await response.json();
    return res.json(data);
    
    // OR Method 2: Using .then() chain (choose one approach, not both)
    // const data = await fetch(url, options)
    //   .then(res => res.json());
    // return res.json(data);
  } catch (error) {
    console.error('TMDB error:', error);
    return res.send('TMDB Fetch failed', 500);
  }
};
