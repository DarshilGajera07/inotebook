import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    getNote()
    // eslint-disable-next-line
  }, [])

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({id: "" , etitle : "", edescription : "", etag : ""})

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id , etitle: currentNote.title, edescription:currentNote.description, etag : currentNote.tag} )

  }
  const handleclick = (e) => {
    editNote(note.id , note.etitle, note.edescription , note.etag);
    e.preventDefault();
    refClose.current.click();
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
                    <input type="text" className="form-control" id="edescription" name='edescription' onChange={onChange} value={note.edescription} minLength={2} required placeholder="Password" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="etag">Tag</label>
                    <input type="text" className="form-control" id="etag" name='etag' onChange={onChange} value={note.etag} placeholder="Password" minLength={2} required />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button disabled={note.etitle.length<2 || note.edescription.length<2} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div>
        <div className='row my-3'>
          <h1>Your notes</h1>

          <div className="container">
          {notes.length===0 && 'No Notes Added You'}
          </div>

          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />
          })}
        </div>
      </div>
    </>
  )
}

export default Notes
