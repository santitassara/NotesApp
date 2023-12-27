const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/', noteController.getAllNotes);
router.post('/', noteController.createNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);
router.put('/:id/archive', noteController.archiveNote);
router.put('/:id/unarchive', noteController.unarchiveNote);
router.put('/:id/addtag', noteController.addTagToNote);
router.put('/:id/removetag', noteController.removeTagFromNote);
router.get('/bytag/:tagName', noteController.getNotesByTag);

module.exports = router;