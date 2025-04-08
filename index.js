const fetch = require('node-fetch');
module.exports = async function ({ req, res, log }) {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };
  
  // Handle OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.send('', 204, corsHeaders);
  }
  
  try {
    // Get the path parameter
    const path = req.query.path || 'movie/popular';
    delete req.query.path; // Remove path from query params
    
    // Build the query string from remaining parameters
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(req.query)) {
      queryParams.append(key, value);
    }
    
    // Get your API key (not the JWT token)
    const TMDB_API_KEY = process.env.TMDB_API_KEY || "84e41db4ef82726ffddb575309afdea4"; // Fallback to the key from your logs
    
    // Add API key to query parameters
    queryParams.append('api_key', TMDB_API_KEY);
    
    const url = `https://api.themoviedb.org/3/${path}?${queryParams.toString()}`;
    
    log(`Calling TMDB: ${url}`);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json'
      }
      // No Authorization header needed when using api_key
    });
    
    // Check if the TMDB response was successful
    if (!response.ok) {
      const errorText = await response.text();
      log(`TMDB API error: ${response.status} - ${errorText}`);
      return res.json({ error: `TMDB API error: ${response.status}` }, 500, corsHeaders);
    }
    
    const data = await response.json();
    return res.json(data, 200, corsHeaders);
  } catch (error) {
    log(`Error: ${error.message}`);
    return res.json({ error: error.message }, 500, corsHeaders);
  }
};
