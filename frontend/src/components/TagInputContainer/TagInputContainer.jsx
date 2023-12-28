import React from "react";

const tagInputContainer = ({note,selectedTag,tagsList,setSelectedTag,handleAddTag,handleShowTagInput}) => {
  return (
    <div className={'tagInputContainer'}>
      <label>Tags: </label>
      {/* <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} /> */}
      <select
        value={selectedTag || ''}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="">Select Tag</option>
        {tagsList.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
      <button className={'tagInputButton'} onClick={() => handleAddTag(note.id, selectedTag)}>
        Add Tag
      </button>
      <button className={'tagInputCancelButton'} onClick={() => handleShowTagInput(null)}>
        Cancel
      </button>
    </div>
  )
}

export default tagInputContainer;