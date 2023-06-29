import pg from 'pg';
const { Pool } = pg;

// Our PG URI
const myURI = 'postgres://esadjnaf:KHocvWQUECK2fEYUfKZu7ybOX_AxNOkK@mahmud.db.elephantsql.com/esadjnaf';

const pool = new Pool({
  connectionString: myURI
});

const ourDBModel = function(text, params, callback) {
  console.log('executed query', text);
  return pool.query(text, params, callback);
};

export default ourDBModel;
  
