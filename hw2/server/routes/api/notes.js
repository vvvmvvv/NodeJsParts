const router = require('express').Router();
const verify = require('../middleware/verify');
const User = require('../../models/User');
const Note = require("../../models/Note");

router.get('/', verify, async (req, res) => {
    try{
        const notes = await Note.find();
        res.json(notes);
    }catch(err){
        res.json({message: err});
    }
    // res.send(req.user);
    // User.findOne({_id: req.user});
});

router.post('/', verify, async (req, res) => {
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        author: req.user
    });

    try{
        const savedNote = await note.save();
        res.json(savedNote);
    }catch(err) {
        res.json({message: err});
    }
});

router.get('/:noteId', async (req, res) => {
    try{
        const note = await Note.findById(req.params.noteId);
        res.json(note);
    }catch(err){
        res.json({message: err});
    }
});

router.delete("/:noteId", async (req, res) => {
    try{
        const removedNote = await Note.remove({_id: req.params.noteId});
        res.json(removedNote);
    } catch(err){
        res.json({message: err});
    }
    
});

router.patch("/:noteId", async (req, res) => {
    try{
        const updatedNote = await Note.updateOne(
            { _id: req.params.noteId},
            { $set: {title: req.body.title}}
        );
        res.json(updatedNote);

    }catch(err){
        res.json({message: err});
    }
})

module.exports = router;