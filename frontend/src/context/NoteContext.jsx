
import React, { createContext, useState, useContext } from 'react';
import { getNotes as fetchNotes, createNote as postNote, updateNote as putNote, deleteNote as eraseNote } from '../services/api';

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



  const contextValue = {
    notes,
    getNotes,
    createNote,
    updateNote,
    editNoteId,
    startEditingNote,
    stopEditingNote,
    deleteNote,
  };

  return <NoteContext.Provider value={contextValue}>{children}</NoteContext.Provider>;
};
