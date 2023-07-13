import pg from 'pg';
const { Pool } = pg;

// Our PG URI
const myURI = process.env.URI;

const pool = new Pool({
  connectionString: myURI
});

const ourDBModel = function(text, params, callback) {
  
  return pool.query(text, params, callback);
};

export default ourDBModel;
  
