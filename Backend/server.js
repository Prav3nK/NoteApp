const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const knex = require('./config/knex');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

const PORT = process.env.PORT || 5000;

knex.raw('select 1+1 as result')
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to the database:', err);
  });