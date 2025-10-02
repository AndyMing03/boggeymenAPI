const express = require("express");
const router = express.Router();
const {
  getAllPlayers,
  getPlayerHistory,
  updatePlayerHandicap,
} = require("../queries/players");

router.get("/", async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (err) {
    console.error("Error fetching players:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/history/:id", async (req, res) => {
  try {
    const playerId = parseInt(req.params.id);
    const player = await getPlayerHistory(playerId);
    res.json(player);
  } catch (err) {
    console.error("Error fetching players history:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/:id/handicap", async (req, res) => {
  const playerId = parseInt(req.params.id);
  const { newHandicap, reason } = req.body;

  if (isNaN(playerId) || typeof newHandicap !== "number") {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    await updatePlayerHandicap(playerId, newHandicap, reason);
    res.json({ message: "Handicap updated and history logged" });
  } catch (err) {
    console.error("Error updating handicap:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
