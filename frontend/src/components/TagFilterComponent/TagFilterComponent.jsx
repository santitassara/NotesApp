import React from "react";
import './TagFilterComponent.css'

const TagFilterComponent = ({ selectedTag, tagsList, handleClearFilters, handleFilterByTag }) => {
  return(
    <div className={'noteListFilter'}>
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
  </div>
  )
  
}

export default TagFilterComponent;