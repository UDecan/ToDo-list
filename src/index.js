const express = require("express");
const app = express();
app.get("*", (req, res) => {
  return res.json({ status: "ok" });
})
app.listen(8080, () => {
  console.log("aplication started");
});