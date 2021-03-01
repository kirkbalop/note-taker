const router = require('express').Router();
const fs = require('fs');
// const { parse } = require('path');
const path = require('path');
const db = require('../db/db.json');
// const data = JSON.parse(fs.readFileSync(path.join(__dirname, '/db/db.json')));

// function getNotes() {
//     return fs.readFileAsync('/db/db.json', 'utf8').then(notes => {
//       JSON.parse(notes);
//       parsedNotes.title = notes.title;
//       parsedNotes.text = notes.text;
//       // make sure data is parsed as an array
//       return parsedNotes
//   })
//   }
// getNotes();

router.get('/notes', (req, res) => {
    res.json(db)
});

router.get('/notes/:id', (req, res) => {
    res.json(data[Number(req.params.id)]);
});

router.post('/notes', (req, res) => {
    let newNote = req.body;
   fs.readFile('./db/db.json', (err, data) => {
       if (err) throw err;
       dbData = JSON.parse(data);
       dbData.push(newNote);
       let number = 1;
       dbData.forEach((note, index) => {
           note.id = number;
           number++;
           return dbData;
       });
       console.log(dbData);

       stringData = JSON.stringify(dbData);

       fs.writeFile('./db/db.json', stringData, (err, data) => {
           if (err) throw err;
       });
   });
res.send('Thank you for your note!')
});

router.delete('/notes/:id', (req, res) => {
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