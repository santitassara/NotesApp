const Note = require('../models/note');
const Tag = require('../models/tag');

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({
      include: [{ model: Tag, attributes: ['name'], through: { attributes: [] } }],
    });

    const formattedNotes = notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        content: note.content,
        status: note.status,
        tags: note.Tags.map((tag) => tag.name),
      };
    });

    res.json(formattedNotes);
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


exports.addTagToNote = async (req, res) => {
  const { id } = req.params;
  const { tagName } = req.body;

  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    let tag = await Tag.findOne({ where: { name: tagName } });
    if (!tag) {
      tag = await Tag.create({ name: tagName });
    }

    await note.addTag(tag);

    res.json({ message: 'Tag added to note successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

exports.removeTagFromNote = async (req, res) => {
  const { id } = req.params;
  const { tagName } = req.body;

  try {
    const note = await Note.findByPk(id);
    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    const tag = await Tag.findOne({ where: { name: tagName } });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    await note.removeTag(tag);

    res.json({ message: 'Tag removed from note successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



exports.getNotesByTag = async (req, res) => {
  const { tagName } = req.params;

  try {
    const tag = await Tag.findOne({ where: { name: tagName } });
    if (!tag) {
      return res.status(404).json({ error: 'Tag not found' });
    }

    const notes = await tag.getNotes({
      include: [{ model: Tag, attributes: ['name'], through: { attributes: [] } }],
    });

    const formattedNotes = notes.map((note) => {
      return {
        id: note.id,
        title: note.title,
        content: note.content,
        status: note.status,
        tags: note.Tags.map((tag) => tag.name),
      };
    });

    res.json(formattedNotes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};