const bcrypt = require('bcryptjs');
const db = require('../config/knex');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const [id] = await db('users').insert({ username, password: hashedPassword });
    res.status(201).json({ message: 'User created', userId: id });
  } catch (error) {
    res.status(400).json({ error: 'User already exists' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await db('users').where({ username }).first();
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }
  res.status(200).json({ message: 'Login successful', userId: user.id });
};