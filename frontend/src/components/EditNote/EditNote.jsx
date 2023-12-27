
import React, { useEffect, useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import './EditNote.css';



const EditNote = () => {
  const { updateNote, notes, editNoteId, stopEditingNote } = useNoteContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const noteToEdit = notes.find((note) => note.id === editNoteId);

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setContent(noteToEdit.content);
    }
  }, [noteToEdit]);

  const handleEditNote = async () => {
    try {
      const updatedData = { title, content };
      await updateNote(editNoteId, updatedData);
      stopEditingNote(); // Detener el modo de edición
    } catch (error) {
      console.error('Error editing note:', error);
    }
  };

  return (
    <div className={"editNoteContainer"}>
      <h2 className={"editNoteTitle"} >Edit Note {editNoteId}</h2>
      <label>Title: </label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Content: </label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button className={"editNoteSaveChangesButton"}  onClick={handleEditNote}>Save Changes</button>
      <button className={"editNoteCancelButton"} onClick={stopEditingNote}>Cancel</button>
    </div>
  );
};

export default EditNote;
