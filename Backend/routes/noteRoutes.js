const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const router = express.Router();

router.get('/:userId', verifyToken, getNotes);
router.post('/:userId', verifyToken, createNote);
router.put('/:id', verifyToken, updateNote);
router.delete('/:id', verifyToken, deleteNote);

module.exports = router;