const express = require('express');
const app = express();
const jsonbodyparser = require('body-parser');
const port = 3000;
const { config } = require('dotenv');
config();
app.use(jsonbodyparser.json());
const routes = require('./routes/routes');

app.listen(port, () => {
  console.log('Server is running on localhost:' + port);
});
app.use('/api',routes);
