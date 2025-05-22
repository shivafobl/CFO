const express = require('express');
const cron = require('node-cron');
const { Client } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'CFO2',
  password: 'Shiva@143',
  port: 5432,
});

client.connect();

const runScheduledTask = () => {
  console.log('Running scheduled task at 9 AM');
  // Your logic here
};

cron.schedule('46 19 * * *', () => {
    runScheduledTask();
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});