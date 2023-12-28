import React, { useEffect, useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import TagInputContainer from '../TagInputContainer/TagInputContainer'
import TagSelectContainer from '../TagSelectContainer/TagSelectContainer'
import { Link } from 'react-router-dom';
import { tagsList } from '../../utils/tagList';
import "./NoteList.css"

const NoteList = ({ onEdit }) => {
  const { notes, startEditingNote, deleteNote, archiveNote, addTagToNote, removeTagFromNote } = useNoteContext();
  const { getNotes } = useNoteContext();
  const [showTagInputNoteId, setShowTagInputNoteId] = useState(null);
  const [showTagSelectNoteId, setShowTagSelectNoteId] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  const handleDeleteNote = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note? This action is irreversible.');
    if (isConfirmed) {
      deleteNote(id);
    }
  }

  const handleToggleArchive = (id, status) => {
    if (status === 'active') {
      archiveNote(id);
      alert("Note archived successfully.")
    }
  };

  const handleShowTagInput = (noteId, tags) => {
    setShowTagInputNoteId(noteId);
    setShowTagSelectNoteId(null);
  };

  const handleShowTagSelect = (noteId, tags) => {
    setShowTagInputNoteId(null);
    setShowTagSelectNoteId(noteId);
  };

  const handleAddTag = (noteId, tags) => {
    const tagArray = tags.split(/[,\s]+/);
    addTagToNote(noteId, tagArray);
  };

  const handleRemoveTag = async (noteId, tags) => {
    try {
      if (!selectedTag) {
        alert("You must select one tag in order to remove it.")
        return;
      }
      await removeTagFromNote(noteId, selectedTag);
      alert("Tag removed successfully.")
      setSelectedTag(null);
      setShowTagSelectNoteId(null);
    } catch (error) {
      console.error('Error removing tag from note:', error);
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
              <div className="tagBalloons">
                {note.tags && note.tags.map((tag) => (
                  <div key={tag} className="tagBalloon">{tag}</div>
                ))}
              </div>
            </div>
            <p className="noteContent">{note.content}</p>

            {showTagInputNoteId === note.id && (
              <TagInputContainer
                note={note}
                tagsList={tagsList}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                handleAddTag={handleAddTag}
                handleShowTagInput={handleShowTagInput}
              />
            )}
            {showTagSelectNoteId === note.id && (
              <TagSelectContainer
                note={note}
                tagsList={tagsList}
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
                handleRemoveTag={handleRemoveTag}
                setShowTagSelectNoteId={setShowTagSelectNoteId}
              />
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
              <button
                className={'noteListRemoveButton'}
                onClick={() => handleShowTagSelect(note.id)}
              >
                Remove Tags
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
