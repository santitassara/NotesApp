
import React from 'react';
import CreateNote from '../../components/CreateNote/CreateNote';
import NoteList from '../../components/NoteList/NoteList';
import EditNote from '../../components/EditNote/EditNote';
import { useNoteContext } from '../../context/NoteContext';
import './Home.css';



const Home = () => {
  const { logout, startEditingNote, stopEditingNote, editNoteId } = useNoteContext();

  const handleEdit = (noteId) => {
    startEditingNote(noteId);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={"HomeContainer"}>
      <h1>Notes App</h1>
      <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
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
