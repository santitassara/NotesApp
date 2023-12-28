import React, { useEffect, useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import TagInputContainer from '../TagInputContainer/TagInputContainer';
import TagSelectContainer from '../TagSelectContainer/TagSelectContainer';
import TagFilterComponent from '../TagFilterComponent/TagFilterComponent';
import { Link } from 'react-router-dom';
import { tagsList } from '../../utils/tagList';
import "./NoteList.css"

const NoteList = ({ onEdit }) => {
  const { notes, startEditingNote, deleteNote, archiveNote, addTagToNote, removeTagFromNote } = useNoteContext();
  const { getNotes } = useNoteContext();
  const [showTagInputNoteId, setShowTagInputNoteId] = useState(null);
  const [showTagSelectNoteId, setShowTagSelectNoteId] = useState(null);
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [filterTag, setFilterTag] = useState("")
  

  const handleDeleteNote = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this note? This action is irreversible.');
    if (isConfirmed) {
      deleteNote(id);
    }
  }

  const handleToggleArchive = async (id, status) => {
    if (status === 'active') {
      await archiveNote(id);
      alert("Note archived successfully.")
      setFilteredNotes(prevFilteredNotes => prevFilteredNotes.filter(note => note.id !== id));
    }
  };

  const handleShowTagInput = (noteId) => {
    setShowTagInputNoteId(noteId);
    setShowTagSelectNoteId(null);
  };

  const handleShowTagSelect = (noteId,note) => {
    if (note.tags< 1){
      alert("Note must have at least ONE tag in order to remove it");
      return
    }
    setShowTagInputNoteId(null);
    setShowTagSelectNoteId(noteId);
  };

  const handleAddTag = (noteId, tags) => {
    const tagArray = tags.split();
    addTagToNote(noteId, tagArray);
  };

  const handleRemoveTag = async (noteId) => {
    try {
      if (!selectedTag) {
        alert("You must select one tag in order to remove it.")
        return;
      }
      await removeTagFromNote(noteId, selectedTag);
      alert("Tag removed successfully.")
      setSelectedTag('');
      setShowTagSelectNoteId(null);
    } catch (error) {
      console.error('Error removing tag from note:', error);
    }
  };

  const handleFilterByTag = (tag) => {
    setFilterTag(tag);
    const filtered = notes.filter(note => note.tags && note.tags.includes(tag) && note.status === 'active');
    console.log(filtered)
    setFilteredNotes(filtered);
  };

  const handleClearFilters = () => {
    setFilterTag('');
    setFilteredNotes([]);
  };

  useEffect(() => {
    getNotes();
  }, [notes]);

  const activeNotes = notes.filter(note => note.status === 'active')
  const archivedNotesCount = notes.filter(note => note.status === 'archived').length;

  const displayNotes = filteredNotes.length > 0 ? filteredNotes.filter(note => note.status === 'active') : filterTag === "" && activeNotes;
  
  return (
    <div className={'noteListContainer'}>
      <div className={'noteListHeader'}>
        <h2 className={'noteListTitle'}>Note List</h2>
        <Link to="/archived">
          <button className={'archivedNotesButton'}>Archived Notes</button>
        </Link>
      </div>
      <TagFilterComponent 
        tagsList={tagsList} 
        selectedTag={filterTag} 
        handleClearFilters={handleClearFilters} 
        handleFilterByTag={handleFilterByTag}
       />
      {/* <div className={'noteListFilter'}>
        <div>
          <h3 className={'noteListFilterTitle'}>Filter Notes</h3>
          <p className={'noteListFilterDescription'}>Select a tag to filter the notes by tag.</p>
        </div>
        <select
          value={selectedTag}
          onChange={(e) => handleFilterByTag(e.target.value)}
          className={'selectTag'}
        >
          <option value="">Select Tag</option>
          {tagsList.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <button
          className={'clearFiltersButton'}
          onClick={handleClearFilters}
        >
          Clear Filters
        </button>
      </div> */}

      <div>
        {displayNotes.length > 0 ? (
          displayNotes.map((note) => (
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
                  onClick={() => handleShowTagSelect(note.id,note)}
                >
                  Remove Tags
                </button>
              </div>
            </div>
          ))
        ) : (
          notes.length === 0 ? <p className={'noNotesMessage'}>No notes</p>:
          archivedNotesCount > 0 ? <p className={'allNotesArchivedMessage'}>All notes archived ({archivedNotesCount})</p>:
          <p className={'noNotesWithTagMessage'}>No notes including "{filterTag}" tag</p>
        )}
      </div>
    </div>
  );
};

export default NoteList;
