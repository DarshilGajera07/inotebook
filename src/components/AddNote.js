import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title : "", description : "", tag : "default"})

    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }
    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    }
    
    return (
        <div>
            <div className='container my-3'>
                <h1>Add notes</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} aria-describedby="emailHelp" placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} placeholder="Password" />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
