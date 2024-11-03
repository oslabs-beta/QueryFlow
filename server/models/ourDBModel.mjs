import pg from 'pg';
const { Pool } = pg;

// Our PG URI
const myURI = process.env.URI;

const pool = new Pool({
  connectionString: myURI,
  //Some Postgres Services have self signing certificates so this tells node to bypass and trust the cert. Remove below if new DB comes and it isnt working.
  ssl: {
    rejectUnauthorized: false,
  },
});

const ourDBModel = function(text, params, callback) {
  
  return pool.query(text, params, callback);
};

export default ourDBModel;
  
