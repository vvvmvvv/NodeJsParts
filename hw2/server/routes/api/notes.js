const router = require('express').Router();
const verify = require('../middleware/verify');
const Note = require("../../models/Note");

router.get('/', verify, async (req, res) => {
    
    try{
        const notes = await Note.find({author: req.user._id});
        res.json(notes);
    }catch(err){
        res.json({message: err});
    }
});

router.post('/', verify, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        author: req.user._id
    });

    try{
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(err) {
        res.json({message: err});
    }
});

router.get('/:noteId', verify, async (req, res) => {
    try{
        const note = await Note.findById(req.params.noteId);
        res.json(note);
    }catch(err){
        res.json({message: err});
    }
});

router.delete("/:noteId", async (req, res) => {
    try{
        const removedNote = await Note.deleteOne({_id: req.params.noteId});
        res.json(removedNote);
    } catch(err){
        res.json({message: err});
    }
    
});

router.put("/:noteId", async (req, res) => {
    try{
        const updatedNote = await Note.findByIdAndUpdate(req.params.noteId,req.body);
        res.json(updatedNote);

    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;