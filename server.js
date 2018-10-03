const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const setupApp = require('./src/app');
const cron = require('node-cron');

app.use(bodyParser.json());

process.env.PORT = process.env.PORT || 3000;


cron.schedule('1,2,4,5 * * * *', () => {
    console.log('running every minute 1, 2, 4 and 5');
  });

setupApp()
  .then(app => app.listen(process.env.PORT, () => console.log(`API RODANDO NA PORTA: ${process.env.PORT}`)))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });