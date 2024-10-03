import { useState } from 'react'
import NoteContext from './noteContext'

const NotesState = (props) => {
  const host = process.env.REACT_APP_API_URL || "http://localhost:5000"
  const initialNotes = []
  
  const [notes, setNotes] = useState(initialNotes)
  
  // Get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const json = await response.json();
      setNotes(json)
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  }

  // Add a note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
        body: JSON.stringify({title, description, tag})
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const note = await response.json();
      setNotes(notes.concat(note))
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  // ... (similar updates for deleteNote and editNote)

  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NotesState;