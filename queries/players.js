const pool = require("../db");

async function getAllPlayers() {
  const res = await pool.query("SELECT * FROM players ORDER BY handicap");
  return res.rows;
}

module.exports = { getAllPlayers };
