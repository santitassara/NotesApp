
import React, { createContext, useState, useContext } from 'react';
import { getNotes as fetchNotes, 
  createNote as postNote, 
  updateNote as putNote, 
  deleteNote as eraseNote, 
  archiveNote as archive, 
  unarchiveNote as unarchive,
  addTagToNote as addTag,
  removeTagFromNote as removeTag,
  login as loginUser,
    } from '../services/api';

const NoteContext = createContext();

export const useNoteContext = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  const [editNoteId, setEditNoteId] = useState(null);

  const getNotes = async () => {
    try {
      const response = await fetchNotes();
      setNotes(response);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const createNote = async (data) => {
    try {
      const createdNote = await postNote(data);
      setNotes((prevNotes) => [...prevNotes, createdNote]);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const updateNote = async (id, data) => {
    try {
      const updatedNote = await putNote(id, data);
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const startEditingNote = (id) => {
    setEditNoteId(id);
  };

  const stopEditingNote = () => {
    setEditNoteId(null);
  };

  const deleteNote = async (id) => {
    try {
      const deleNote = await eraseNote(id);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const archiveNote = async (id) => {
    try {
      await archive(id);
     
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, status: 'archived' } : note))
      );
    } catch (error) {
      console.error('Error archiving note:', error);
    }
  };

  const unarchiveNote = async (id) => {
    try {
      await unarchive(id);
 
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === id ? { ...note, status: 'active' } : note))
      );
    } catch (error) {
      console.error('Error unarchiving note:', error);
    }
  };

  const addTagToNote = async (noteId, tagName) => {
    try {
      await addTag(noteId, tagName);
    
     // getNotes();
    } catch (error) {
      console.error('Error adding tag to note:', error);
    }
  };

  const removeTagFromNote = async (noteId, tagName) => {
    try {
      await removeTag(noteId, tagName);
   
    } catch (error) {
      console.error('Error removing tag from note:', error);
    }
  };
  
  const login = async (username, password) => {
    try {
      const response = await loginUser(username, password);
      // Puedes manejar la respuesta según tus necesidades (por ejemplo, almacenar el token en el estado).
      return response;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  };


  const contextValue = {
    notes,
    getNotes,
    createNote,
    updateNote,
    editNoteId,
    startEditingNote,
    stopEditingNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    addTagToNote,
    removeTagFromNote,
    login,
  };

  return <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>;
};
