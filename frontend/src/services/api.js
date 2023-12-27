
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', 
});

export const createNote = async (data) => {
  try {
    const response = await api.post('/notes', data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getNotes = async () => {
  try {
    const response = await api.get('/notes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateNote = async (id, data) => {
  try {
    const response = await api.put(`/notes/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const archiveNote = async (id) => {
  try {
    const response = await api.put(`/notes/${id}/archive`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unarchiveNote = async (id) => {
  try {
    const response = await api.put(`/notes/${id}/unarchive`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    await api.delete(`/notes/${id}`);
  } catch (error) {
    throw error;
  }
};

export const addTagToNote = async (id, tagArray) => {
  try {
    const response = await api.put(`/notes/${id}/addtag`, tagArray);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeTagFromNote = async (id, tagName) => {
  try {
    const response = await api.put(`/notes/${id}/removetag`, { tagName });
    return response.data;
  } catch (error) {
    throw error;
  }
};



export default api;
