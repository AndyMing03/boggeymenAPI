const pool = require("../db");

async function getCourses() {
  const res = await pool.query("SELECT * FROM courses");
  return res.rows;
}

async function createCourse(name) {
  const res = await pool.query(
    "INSERT INTO courses (name) VALUES ($1) RETURNING *",
    [name]
  );
  return res.rows[0];
}

module.exports = { getCourses, createCourse };
