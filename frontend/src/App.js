import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './views/Home/Home';
import NotFound from './views/NotFound/NotFound';
import ArchivedNotes from './components/ArchivedNotes/ArchivedNotes.jsx';
import { NoteProvider, useNoteContext } from './context/NoteContext';
import LoginComponent from './components/LoginComponent/LoginComponent';

function App() {
  return (
    <Router>
      <NoteProvider>
        <Routes>
          {/* Use a wrapper route to handle authentication check */}
          <Route
            path="/"
            element={<LoginComponent />}
          />
          <Route
            path="/home"
            element={<AuthWrapper element={<Home />} />}
          />
          <Route
            path="/archived"
            element={<AuthWrapper element={<ArchivedNotes />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </NoteProvider>
    </Router>
  );
}

// Wrapper component to check authentication status
const AuthWrapper = ({ element }) => {
  const { isAuthenticated } = useNoteContext();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return element;
};

export default App;
