const express = require("express");
const config = require("config");
const pg = require("pg");
const router = require('./routes/index_router');
const path = require('path')
const db = require('./db');


const app = express();
const PORT = process.env.PORT || config.get('port') || 5000;

app.use(express.json());
// /api/user/authorize
app.use('/api', router);

app.use('/', express.static(path.join(__dirname, '../', 'todo-list', 'build')))



app.get('*', (req, res) => {
  console.log(req.url)
  res.sendFile(path.resolve(__dirname, '../', 'todo-list', 'build', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Aplication has been started on port ${PORT}...`);
});
