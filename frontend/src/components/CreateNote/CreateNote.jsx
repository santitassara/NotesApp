import React, { useState } from 'react';
import { useNoteContext } from '../../context/NoteContext';
import './CreateNote.css';
import {tagsList} from '../../utils/tagList';



const CreateNote = () => {
  const { createNote, addTagToNote } = useNoteContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  
  const handleTagClick = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleCreateNote = async () => {
    console.log(title)
    try {
      const newData = { title, content, tags: selectedTags };
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
      <div className="tagsContainer">
        <h3>Tags</h3>
        <div className="tags">
          {tagsList.map((tag) => (
            <div
              key={tag}
              className={`tag ${selectedTags.includes(tag) ? 'selected' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
      <br />
      <button className={"createNoteButton"} onClick={handleCreateNote}>Create Note</button>
    </div>
  );
};

export default CreateNote;
