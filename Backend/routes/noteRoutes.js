const express = require('express');
const { verifyToken } = require('../middleware/authMiddleware');
const { getNotes, createNote, updateNote, deleteNote } = require('../controllers/noteController');
const router = express.Router();

/**
 * @swagger
 * /notes/{userId}:
 *   get:
 *     summary: Get all notes for a user
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of notes
 *       403:
 *         description: Unauthorized
 */
router.get('/:userId', verifyToken, getNotes);

/**
 * @swagger
 * /notes/{userId}:
 *   post:
 *     summary: Add a new note for a user
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Note added successfully
 *       403:
 *         description: Unauthorized
 */
router.post('/:userId', verifyToken, createNote);

/**
 * @swagger
 * /notes/{id}:
 *   put:
 *     summary: Update a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Note ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Note updated successfully
 *       403:
 *         description: Unauthorized
 */
router.put('/:id', verifyToken, updateNote);

/**
 * @swagger
 * /notes/{id}:
 *   delete:
 *     summary: Delete a note
 *     tags: [Notes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Note ID
 *     responses:
 *       200:
 *         description: Note deleted successfully
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.delete('/:id', verifyToken, deleteNote);

module.exports = router;