const express = require('express');
const { listNotes, createNote } = require('./store/notes');
const { validateNotePayload } = require('./validators/noteValidator');

const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.get('/api/notes', (_req, res) => {
  res.status(200).json({
    notes: listNotes(),
  });
});

app.post('/api/notes', (req, res) => {
  const error = validateNotePayload(req.body);

  if (error) {
    return res.status(400).json({ error });
  }

  const note = createNote(req.body.title.trim());

  return res.status(201).json({
    note,
  });
});

module.exports = app;