const pool = require("../db");

async function getCourses() {
  const query = `
    SELECT 
      c.id as course_id,
      c.name,
      h.hole_number, 
      h.par, 
      h.si
    FROM courses c
    INNER JOIN holes h ON h.course_id = c.id
  `;

  const res = await pool.query(query);
  const rows = res.rows;

  const coursesMap = new Map();

  for (const row of rows) {
    const { course_id, name, hole_number, par, si } = row;

    if (!coursesMap.has(course_id)) {
      coursesMap.set(course_id, {
        id: course_id,
        name,
        holes: [],
      });
    }

    coursesMap.get(course_id).holes.push({ hole_number, par, si });
  }

  return Array.from(coursesMap.values());
}

async function createCourse(name) {
  const res = await pool.query(
    "INSERT INTO courses (name) VALUES ($1) RETURNING *",
    [name]
  );
  return res.rows[0];
}

module.exports = { getCourses, createCourse };
