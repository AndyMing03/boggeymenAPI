const express = require("express");
const router = express.Router();
const { getHolesByCourse, createHole } = require("../queries/holes");

router.get("/course/:courseId", async (req, res) => {
  const holes = await getHolesByCourse(req.params.courseId);
  res.json(holes);
});

router.post("/", async (req, res) => {
  const { course_id, hole_number, par, si } = req.body;
  const hole = await createHole(course_id, hole_number, par, si);
  res.status(201).json(hole);
});

module.exports = router;
