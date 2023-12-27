
import React from 'react';
import { Link } from 'react-router-dom';
import CreateNote from '../../components/CreateNote/CreateNote';
import NoteList from '../../components/NoteList/NoteList';
import EditNote from '../../components/EditNote/EditNote';
import { useNoteContext } from '../../context/NoteContext';
import './Home.css';



const Home = () => {
  const { notes, getNotes, startEditingNote, stopEditingNote, editNoteId } = useNoteContext();

  const handleEdit = (noteId) => {
    startEditingNote(noteId);
  };



  return (
    <div className={"HomeContainer"}>
      <h1>Notes App</h1>
      {editNoteId ? (
        <EditNote onClose={stopEditingNote} />
      ) : (
        <>
          <CreateNote />
          <NoteList onEdit={handleEdit} />
        </>
      )}
    </div>
  );
};


export default Home;
