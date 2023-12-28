import React from "react";

const tagInputContainer = ({note,selectedTag,tagsList,setSelectedTag,handleRemoveTag,setShowTagSelectNoteId}) => {
  return (
    <div className={'tagSelectContainer'}>
    <label>Tags: </label>
    <select
      value={selectedTag || ''}
      onChange={(e) => setSelectedTag(e.target.value)}
    >
      <option value="">Select Tag</option>
      {note.tags.map((tag) => (
        <option key={tag} value={tag}>
          {tag}
        </option>
      ))}
    </select>
    <button className={'tagSelectButton'} onClick={() => handleRemoveTag(note.id, selectedTag)}>
      Remove Tag
    </button>
    <button className={'tagSelectCancelButton'} onClick={() => setShowTagSelectNoteId(null)}>
      Cancel
    </button>
  </div>
)}


export default tagInputContainer;