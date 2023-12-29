import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './views/NotFound/NotFound';
import ArchivedNotes from './components/ArchivedNotes/ArchivedNotes.jsx';
import { NoteProvider } from './context/NoteContext';
import LoginComponent from './components/LoginComponent/LoginComponent';

function App() {
  return (
    <Router>
      <NoteProvider>
        <Routes>
          <Route exact path="/" element={<LoginComponent />} />
          <Route exact path="/home" element={<Home />} />

          <Route exact path="/archived" element={<ArchivedNotes />} />
          <Route exact path="*" element={<NotFound />} />
          
        </Routes>
      </NoteProvider>
    </Router>
  );
}

export default App;