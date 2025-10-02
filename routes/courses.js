const express = require("express");
const router = express.Router();
const { getCourses, createCourse } = require("../queries/courses");

router.get("/", async (req, res) => {
  const courses = await getCourses();
  res.json(courses);
});

router.post("/", async (req, res) => {
  const { name } = req.body;
  const course = await createCourse(name);
  res.status(201).json(course);
});

module.exports = router;
