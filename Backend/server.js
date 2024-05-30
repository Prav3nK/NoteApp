const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use('/auth', authRoutes);
app.use('/notes', noteRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});