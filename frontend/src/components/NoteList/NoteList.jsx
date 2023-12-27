
import React, { useEffect, useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import { Link } from 'react-router-dom';
import "./NoteList.css"

const NoteList = ({ onEdit }) => {
  const { notes, startEditingNote, deleteNote, archiveNote, addTagToNote } = useNoteContext();
  const { getNotes } = useNoteContext();
  const [isTag, setIsTag] = useState(false);
  const [tags, setTags] = useState('');
  const [showTagInputNoteId, setShowTagInputNoteId] = useState(null);



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

  const handleShowTagInput = (noteId, tags) => {


    setShowTagInputNoteId(noteId)
    // const tagArray = tags.split(/[,\s]+/);

    // addTagToNote(noteId, tagArray);
  };

  const handleAddTag = (noteId, tags) => {

     const tagArray = tags.split(/[,\s]+/);

     addTagToNote(noteId, tagArray);
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

            {showTagInputNoteId === note.id && (
              <div className={'tagInputContainer'}>
                <label>Tags: </label>
                <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
                <button className={'tagInputButton'} onClick={() => handleAddTag(note.id, tags)}>
                  Add Tags
                </button>
                <button className={'tagInputCancelButton'} onClick={() => handleShowTagInput(null)}>
                  Cancel
                </button>
              </div>
            )}

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
              <button
                className={'noteListAddTagButton'}
                onClick={() => handleShowTagInput(note.id)}
              >
                Add Tags
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
