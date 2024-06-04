import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote } = context;
  useEffect(() => {
    getNote()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const [note, setNote] = useState({etitle : "", edescription : "", etag : ""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({etitle: currentNote.title, edescription:currentNote.description, etag : currentNote.tag} )

  }
  const handleclick = (e) => {
    console.log("update...", note)
    e.preventDefault();
  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }


  return (
    <>
      <AddNote />


      <div>

        <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">

                <form>
                  <div className="form-group">
                    <label htmlFor="etitle">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' onChange={onChange} aria-describedby="emailHelp" value={note.etitle} placeholder="Enter title" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="edescription">Description</label>
                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="etag">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} placeholder="Password" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>
        <div className='row my-3'>
          <h1>Your notes</h1>
          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
