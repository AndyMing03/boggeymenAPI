const pool = require("../db");

async function getHolesByCourse(courseId) {
  const res = await pool.query(
    // "SELECT * FROM holes WHERE course_id = $1 ORDER BY hole_number",
    "select c.name, h.hole_number, h.par , h.si  from courses c " +
      "inner join holes h on h.course_id  = c.id " +
      "where c.id = $1",
    [courseId]
  );
  return res.rows;
}

async function createHole(course_id, hole_number, par, si) {
  const res = await pool.query(
    "INSERT INTO holes (course_id, hole_number, par, si) VALUES ($1, $2, $3, $4) RETURNING *",
    [course_id, hole_number, par, si]
  );
  return res.rows[0];
}

module.exports = { getHolesByCourse, createHole };
