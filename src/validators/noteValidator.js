function validateNotePayload(body) {
  if (!body || typeof body.title !== 'string') {
    return 'title is required';
  }

  const title = body.title.trim();

  if (!title) {
    return 'title cannot be empty';
  }

  return null;
}

module.exports = {
  validateNotePayload,
};