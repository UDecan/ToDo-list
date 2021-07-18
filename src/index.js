const express = require("express");
const config = require("config");
const pg = require("pg");
const userRouter = require('./routes/user_routes');

const app = express();
const PORT = config.get('port') || 8080;

app.use(express.json());
app.use('/api', userRouter);

app.get("*", (req, res) => {
  return res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Aplication has been started on port ${PORT}...`);
});