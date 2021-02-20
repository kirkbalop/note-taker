const router = require('express').Router();
const { response } = require('express');
const fs = require('fs');
const path = require('path');
const data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

router.get('/api/notes', () => {
    res.json(data);
});

router.get('/api/notes/:id', (req, res) => {
    res.json(data[Number(req.params.id)]);
});

router.post('/api/notes', (req, res) => {
    let note = req.body;
    let uniqueId = (data.length).toString();
    console.log(uniqueId);
    note.id = uniqueId;
    data.push(note);

    fs.writeFileSync('./db/db.json', JSON.stringify(data), function(err) {
        if (err) throw (err);
    });

    res.json(data);
});

router.delete('/api/notes/:id', (req, res) => {
    let noteId = req.params.id;
    let newId = 0;
    console.log(`Deleting note ID ${noteId}`);
    data = data.filter(currentNote => {
        return currentNote.id != noteId;
});
for (currentNote of data) {
    currentNote.id = newId.toString();
    newId++;
}
fs.writeFileSync('./db/db.json', JSON.stringify(data));
res.json(data);
});

module.exports = router;