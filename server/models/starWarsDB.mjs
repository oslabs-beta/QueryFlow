import pg from 'pg';
const { Pool } = pg;

// Star Wars URI
const myURI = 'postgres://qducrbjy:Ihj5w7wnjYZBG2h11DGdc9HZy7t4Z-PI@mahmud.db.elephantsql.com/qducrbjy';

const pool = new Pool({
  connectionString: myURI
});

module.exports = {
  query: function(text, params, callback) {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};
