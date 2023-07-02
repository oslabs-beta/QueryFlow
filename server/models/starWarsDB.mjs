import pg from 'pg';
const { Pool } = pg;

// Star Wars URI
const myURI = 'postgres://cymnoetn:kKYAY5x45yLUBTvxpkMSwuzQgX_JUK8N@mahmud.db.elephantsql.com/cymnoetn';

const pool = new Pool({
  connectionString: myURI
});


const starWarsDB = function(text, params, callback) {
  console.log('executed query', text);
  return pool.query(text, params, callback);
};

export default starWarsDB;
  

  