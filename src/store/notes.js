let notes = [];
let nextId = 1;

function listNotes() {
  return notes;
}

function createNote(title) {
  const note = {
    id: nextId++,
    title,
  };

  notes.push(note);
  return note;
}

function resetNotes() {
  notes = [];
  nextId = 1;
}

module.exports = {
  listNotes,
  createNote,
  resetNotes,
};