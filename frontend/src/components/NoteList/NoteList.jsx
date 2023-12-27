
import React, { useEffect, useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import "./NoteList.css"

const NoteList = ({ onEdit }) => {
  const { notes, startEditingNote, deleteNote } = useNoteContext();
  const { getNotes } = useNoteContext();

  const handleDeleteNote = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note? this action is irreversible');
    if (isConfirmed) {
      deleteNote(id);
    }
  }


  useEffect(() => {
    getNotes();
  }, [notes]);

  return (
    <div className={"noteListContainer"}>
      <h2 className={"noteListTitle"}>Note List</h2>
      <div>
        {notes.map((note) => (
          <div className={"noteList"}>
          <div className="noteHeader">
            <h3 className="noteTitle">{note.title}</h3>
          </div>
          <p className="noteContent">{note.content}</p>
          <div className="noteActions">
            <button className={"noteListEditButton"} onClick={() => startEditingNote(note.id)}>
              Edit
            </button>
            <button className={"noteListDeleteButton"} onClick={() => handleDeleteNote(note.id)}>
              Delete
            </button>
          </div>
        </div>
        
        ))}
      </div>
    </div>
  );
};

export default NoteList;
