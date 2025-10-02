const pool = require("../db");

async function getAllPlayers() {
  const res = await pool.query("SELECT * FROM players ORDER BY handicap");
  return res.rows;
}

async function getPlayerHistory(playerId) {
  const query = `
    SELECT player_id, old_handicap, new_handicap, change_date, reason
    FROM player_hcp_history
    WHERE player_id = $1
    ORDER BY change_date DESC
  `;

  const res = await pool.query(query, [playerId]);
  console.log("Hello", res.rows);
  return res.rows;
}

async function updatePlayerHandicap(playerId, newHandicap, reason = null) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Get current handicap
    const { rows } = await client.query(
      "SELECT handicap FROM players WHERE id = $1",
      [playerId]
    );
    const oldHandicap = rows[0]?.handicap;

    // Update player's handicap
    await client.query("UPDATE players SET handicap = $1 WHERE id = $2", [
      newHandicap,
      playerId,
    ]);

    // Log the change in history
    await client.query(
      `INSERT INTO player_hcp_history (player_id, old_handicap, new_handicap, reason)
       VALUES ($1, $2, $3, $4)`,
      [playerId, oldHandicap, newHandicap, reason]
    );

    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}

module.exports = {
  getAllPlayers,
  updatePlayerHandicap,
  getPlayerHistory,
};
