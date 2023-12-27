import React, { useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import './CreateNote.css'

const CreateNote = () => {
  const { createNote } = useNoteContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleCreateNote = async () => {
    try {
      const newData = { title, content };
      await createNote(newData);
      
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  return (
    <div className={"createNoteContainer"}>
      <h2>Create Note</h2>
      <label>Title: </label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <label>Content: </label>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button className={"createNoteButton"} onClick={handleCreateNote}>Create Note</button>
    </div>
  );
};

export default CreateNote;
