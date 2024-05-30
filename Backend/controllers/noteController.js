const db = require('../config/knex');

exports.getNotes = async (req, res) => {
  const notes = await db('notes').where({ user_id: req.params.userId });
  res.status(200).json(notes);
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.params;
  const [id] = await db('notes').insert({ title, content, user_id: userId });
  res.status(201).json({ message: 'Note created', noteId: id });
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  await db('notes').where({ id }).update({ title, content });
  res.status(200).json({ message: 'Note updated' });
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  await db('notes').where({ id }).del();
  res.status(204).send();
};