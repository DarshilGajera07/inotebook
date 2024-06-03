import { useState } from 'react'
import NoteContext from './noteContext'

const NotesState = (props) => {
    const intialNotes = [
  {
    "_id": "665c30d10442a436c0f75ddf",
    "user": "665c0d3289853c9e849f6252",
    "title": "this is title",
    "description": "this is description",
    "tag": "this is tag",
    "date": "2024-06-02T08:44:01.084Z",
    "__v": 0
  },
  {
    "_id": "665c30d20442a436c0f75de1",
    "user": "665c0d3289853c9e849f6252",
    "title": "this is title",
    "description": "this is description",
    "tag": "this is tag",
    "date": "2024-06-02T08:44:02.356Z",
    "__v": 0
  }
]

  const [notes, setnotes] = useState(intialNotes)
  
    return (
        <NoteContext.Provider value={{notes,setnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
    
}

export default NotesState;