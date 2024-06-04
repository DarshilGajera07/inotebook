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
    console.log(json);
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
    const json = response.json();

    console.log("adding a new note");
    const note = {
      "_id": "665c30d20442a436c0f75de2",
      "user": "665c0d3289853c9e849f6252",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2024-06-02T08:44:02.356Z",
      "__v": 0
    };

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
    console.log(json);
    
    const newNotes = notes.filter((note) => { return note._id !== id });
    setnotes(newNotes)
  }

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1YzBkMzI4OTg1M2M5ZTg0OWY2MjUyIn0sImlhdCI6MTcxNzMwODcyMn0.U_Fk7ynfAINIFzJ_EWXYLedJG4vz_LF9GWRNCGK0Thc'
      },
      body: JSON.stringify({title , description, tag})
    });
    const json = response.json();

    //Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;

      }
    }
  }

  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote, editNote,getNote }}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NotesState;