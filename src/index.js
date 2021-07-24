const express = require("express");
const config = require("config");
const pg = require("pg");
const router = require('./routes/index_router');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json());
app.use('/api', router);

// app.get("*", (req, res) => {
//   return res.json({ status: "ok" });
// });

app.listen(PORT, () => {
  console.log(`Aplication has been started on port ${PORT}...`);
});