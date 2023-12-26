const Note = require('../models/note');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll();
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newNote = await Note.create({ title, content });
    res.json(newNote);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Actualiza la nota
    note.title = title;
    note.content = content;
    await note.save();

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.archiveNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Archivar la nota
    note.status = 'archived';
    await note.save();

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.unarchiveNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Desarchivar la nota
    note.status = 'active';
    await note.save();

    res.json(note);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};


exports.deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findByPk(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    // Elimina la nota
    await note.destroy();

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
