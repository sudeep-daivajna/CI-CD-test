const { validateNotePayload } = require('../src/validators/noteValidator');

describe('validateNotePayload', () => {
  test('returns error if title is missing', () => {
    expect(validateNotePayload({})).toBe('title is required');
  });

  test('returns error if title is empty', () => {
    expect(validateNotePayload({ title: '   ' })).toBe('title cannot be empty');
  });

  test('returns null for valid payload', () => {
    expect(validateNotePayload({ title: 'Buy milk' })).toBeNull();
  });
});