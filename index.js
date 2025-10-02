const express = require("express");
const cors = require("cors");
require("dotenv").config();

const coursesRouter = require("./routes/courses");
const holesRouter = require("./routes/holes");
const playersRouter = require("./routes/players");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/courses", coursesRouter);
app.use("/holes", holesRouter);
app.use("/players", playersRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
