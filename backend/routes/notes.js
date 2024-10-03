const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//ROUTE 1 :Get all the notes of login user  using : GET "/api/notes/fetchallnotes" ,require login.
router.get('/fetchallnotes', fetchuser, async (req, res) => {
      try {
            const notes = await Note.find({ user: req.user.id });
            res.json(notes)
      } catch (error) {
            console.log(error.message);
                  res.status(500).send("Internal server error.");
      }
})

//ROUTE 2 :Add a new a notes  using : POST "/api/notes/addnote" ,require login.
router.post('/addnote', fetchuser, [

      body('title', 'Enter a valid title').isLength({ min: 3 }),
      body('description', 'Description atleast 5 character').isLength({ min: 5 }),

], async (req, res) => {

      try {
            const { title, description, tag } = req.body;
            //if there are error return the bad request and the error.
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({
                  title, description, tag, user: req.user.id

            })
            const saveNote = await note.save()
            res.json(saveNote)

      } catch (error) {
            console.log(error.message);
                  res.status(500).send("Internal server error.");
      }
})


//ROUTE 3 :Update an existing notes using POST : PUT "/api/notes/updatenote" ,require login.
router.put('/updatenote/:id', fetchuser, async (req, res) => {

      const { title, description, tag } = req.body;
      try {
            //creat a new notes
            const newNotes = {};
            if (title) {
                  newNotes.title = title
            }
            if (description) {
                  newNotes.description = description
            }
            if (tag) {
                  newNotes.tag = tag
            }

            //find the note to be updated and update it.
            let note = await Note.findById(req.params.id);
            if (!note) {
                  return res.status(404).send("Not Found");
            }

            if (note.user.toString() !== req.user.id) {
                  return res.status(404).send("Not Allowed");
            }

            note = await Note.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true });

            res.json({ note });
      } catch (error) {
            console.log(error.message);
                  res.status(500).send("Internal server error.");

      }
})

//ROUTE 4 :Delete an existing notes using POST : DELETE "/api/notes/deletenote" ,require login.
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
      try {
            //find the note to be deleted and delete it.
            let note = await Note.findById(req.params.id);
            if (!note) {
                  return res.status(404).send("Not Found");
            }

            //Allow the deletion only if user owns this notes.
            if (note.user.toString() !== req.user.id) {
                  return res.status(404).send("Not Allowed");
            }

            note = await Note.findByIdAndDelete(req.params.id);

            res.json({ "Success": "Note has been Deleted.", note: note });
      } catch (error) {
            console.log(error.message);
                  res.status(500).send("Internal server error.");

      }
})

module.exports = router