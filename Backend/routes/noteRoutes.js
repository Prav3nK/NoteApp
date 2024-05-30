const express = require('express');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const router = express.Router();

router.get('/:userId', getNotes);
router.post('/:userId', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

module.exports = router;