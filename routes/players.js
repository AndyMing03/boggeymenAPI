const express = require("express");
const router = express.Router();
const { getAllPlayers } = require("../queries/players");

router.get("/", async (req, res) => {
  try {
    const players = await getAllPlayers();
    res.json(players);
  } catch (err) {
    console.error("Error fetching players:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
