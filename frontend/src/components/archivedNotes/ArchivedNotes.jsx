import React, { useEffect } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import './ArchivedNotes.css';
import { Link } from 'react-router-dom';

const ArchivedNotes = () => {
  const { notes, unarchiveNote,getNotes } = useNoteContext();


  const handleUnarchiveNote = (id) => {
    unarchiveNote(id);
  };

  useEffect(() => {
    getNotes();
  }, []);


  const archivedNotes = notes.filter((note) => note.status === 'archived');

  return (
    <div className={'archivedNotesContainer'}>
      <h2 className={'archivedNotesTitle'}>Archived Notes</h2>
      <div>
        {archivedNotes.map((note) => (
          <div className={'archivedNote'} key={note.id}>
            <div className="noteHeader">
              <h3 className="noteTitle">{note.title}</h3>
              <div className="tagBalloons">
                {note.tags.map((tag) => (
                  <div key={tag} className="tagBalloon">{tag}</div>
                ))}
              </div>
            </div>
            <p className="noteContent">{note.content}</p>
            <div className="noteActions">
              <button className={'archivedNoteUnarchiveButton'} onClick={() => handleUnarchiveNote(note.id)}>
                Unarchive
              </button>
            </div>
          </div>
        ))}
      </div>
      <Link to="/">
        <button className={'backButton'}>Back</button>
      </Link>
    </div>
  );
};

export default ArchivedNotes;
