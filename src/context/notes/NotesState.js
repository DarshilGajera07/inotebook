import { useState } from 'react'
import NoteContext from './noteContext'

const NotesState = (props) => {
  const host = "http://localhost:5000"
  const intialNotes = []

  const [notes, setnotes] = useState(intialNotes)

  //Get allnote
  const getNote = async () => {
    //API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzBkMzI4OTg1M2M5ZTg0OWY2MjUyIn0sImlhdCI6MTcxNzMwODcyMn0.U_Fk7ynfAINIFzJ_EWXYLedJG4vz_LF9GWRNCGK0Thc'
      },
    });
    const json =await response.json();
    setnotes(json)
  }



  //Add a note
  const addNote = async (title, description, tag) => {
    //TO Do : API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzBkMzI4OTg1M2M5ZTg0OWY2MjUyIn0sImlhdCI6MTcxNzMwODcyMn0.U_Fk7ynfAINIFzJ_EWXYLedJG4vz_LF9GWRNCGK0Thc'
      },
      body: JSON.stringify({title , description, tag})
    });
    const note =await response.json();
    setnotes(notes.concat(note))
  }

  //Delete a note
  const deleteNote =async (id) => {
    //API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzBkMzI4OTg1M2M5ZTg0OWY2MjUyIn0sImlhdCI6MTcxNzMwODcyMn0.U_Fk7ynfAINIFzJ_EWXYLedJG4vz_LF9GWRNCGK0Thc'
      },
    });
    const json =await response.json();

    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzBkMzI4OTg1M2M5ZTg0OWY2MjUyIn0sImlhdCI6MTcxNzMwODcyMn0.U_Fk7ynfAINIFzJ_EWXYLedJG4vz_LF9GWRNCGK0Thc'
      },
      body: JSON.stringify({title , description, tag})
    });
    const json =await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
  }

  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NotesState;