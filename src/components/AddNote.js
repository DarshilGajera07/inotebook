import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;

    const [note, setNote] = useState({title : "", description : "", tag : ""})

    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({title : "", description : "", tag : ""});
        props.showAlert("Added Successfully", "success");

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
                        <input type="text" className="form-control" id="title" name='title' onChange={onChange} aria-describedby="emailHelp" minLength={2} value={note.title} required placeholder="Enter title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name='description' onChange={onChange} minLength={2} value={note.description} required placeholder="Enter Description" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tag">Tag</label>
                        <input type="text" className="form-control" id="tag" name='tag' onChange={onChange} placeholder="Enter Tag" minLength={2} value={note.tag} required />
                    </div>
                    
                    <button disabled={note.title.length<2 || note.description.length<2} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
                </form>
            </div>
        </div>
    )
}

export default AddNote
