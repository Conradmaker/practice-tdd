const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

process.env.NODE_ENV =
  process.env.NODE_ENV &&
  process.env.NODE_ENV.trim().toLowerCase() == 'production'
    ? 'production'
    : 'development';
dotenv.config({ path: path.join(__dirname, '.env.local') });
const PORT = 8000;
const HOST = '0.0.0.0';

const app = express();
mongoose
  .connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MONGO_DB_CONNECTED'))
  .catch(() => console.error('MONGO_DB_ERROR'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./routes'));
app.get('/', (req, res) => {
  res.send('안녕');
});
app.listen(PORT, () => console.log(`SERVER RUNNING AT http://${HOST}:${PORT}`));

module.exports = app;
