const request = require('supertest');
const app = require('../src/app');
const { resetNotes } = require('../src/store/notes');

beforeEach(() => {
  resetNotes();
});

describe('GET /health', () => {
  test('returns ok', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('notes api', () => {
  test('creates a note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: 'Learn GitHub Actions' });

    expect(res.statusCode).toBe(201);
    expect(res.body.note).toEqual({
      id: 1,
      title: 'Learn GitHub Actions',
    });
  });

  test('rejects invalid note', async () => {
    const res = await request(app)
      .post('/api/notes')
      .send({ title: '   ' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: 'title cannot be empty',
    });
  });

  test('lists notes', async () => {
    await request(app).post('/api/notes').send({ title: 'One' });
    await request(app).post('/api/notes').send({ title: 'Two' });

    const res = await request(app).get('/api/notes');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      notes: [
        { id: 1, title: 'One' },
        { id: 2, title: 'Two' },
      ],
    });
  });
});