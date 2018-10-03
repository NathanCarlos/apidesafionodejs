const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const setupApp = require('./src/app');

app.use(bodyParser.json());

process.env.PORT = process.env.PORT || 3000;


setupApp()
  .then(app => app.listen(process.env.PORT, () => console.log(`API RODANDO NA PORTA: ${process.env.PORT}`)))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });