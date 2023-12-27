
import React, { useEffect, useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import { Link } from 'react-router-dom';
import "./NoteList.css"

const NoteList = ({ onEdit }) => {
  const { notes, startEditingNote, deleteNote, archiveNote } = useNoteContext();
  const { getNotes } = useNoteContext();

  const handleDeleteNote = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note? this action is irreversible');
    if (isConfirmed) {
      deleteNote(id);
    }
  }

  const handleToggleArchive = (id, status) => {
    if (status === 'active') {

      archiveNote(id);

    }
  };


  useEffect(() => {
    getNotes();
  }, [notes]);

  const activeNotes = notes.filter((note) => note.status === 'active');

  return (
    <div className={'noteListContainer'}>
      <div className={'noteListHeader'}>
        <h2 className={'noteListTitle'}>Note List</h2>
        <Link to="/archived">
          <button className={'archivedNotesButton'}>Archived Notes</button>
        </Link>
      </div>

      <div>
        {activeNotes.map((note) => (
          <div className={'noteList'} key={note.id}>
            <div className="noteHeader">
              <h3 className="noteTitle">{note.title}</h3>
            </div>
            <p className="noteContent">{note.content}</p>
            <div className="noteActions">
              <button className={'noteListEditButton'} onClick={() => startEditingNote(note.id)}>
                Edit
              </button>
              <button className={'noteListDeleteButton'} onClick={() => handleDeleteNote(note.id)}>
                Delete
              </button>
              <button
                className={'noteListArchiveButton'}
                onClick={() => handleToggleArchive(note.id, note.status)}
              >
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
