const request = require('supertest');

describe('User API Tests', () => {

  // GET
  it('GET /users - should return list of users', async () => {
    const response = await request(process.env.BASE_URL)
      .get('/api/users?page=2')
      .set('Accept', 'application/json')
      .set('x-api-key', process.env.API_KEY);
    
    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);

    const requiredProps = {
        id: 'number',
        email: 'string',
        first_name: 'string',
        last_name: 'string',
        avatar: 'string',
    };

    const allUsersValid = response.body.data.every(user =>
        Object.entries(requiredProps).every(
            ([key, type]) => key in user && typeof user[key] === type
        )
    );

    expect(allUsersValid).toBe(true);
  });

//   CREATE
  it('POST /users - should create a new user', async () => {
    const payload = {
        name: process.env.USER_NAME,
        job: process.env.USER_JOB
    };
    
    const response = await request(process.env.BASE_URL)
      .post('/api/users')
      .send(payload)
      .set('Accept', 'application/json')
      .set('x-api-key', process.env.API_KEY);
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body.name).toBe(payload.name);
    expect(response.body.job).toBe(payload.job);
  });

  // PUT
  it('PUT /users/:id - should update a user with PUT method', async () => {
    const payload = {
        name: process.env.USER_NAME_UPDATE,
        job: process.env.USER_JOB_UPDATE
    };

    const response = await request(process.env.BASE_URL)
      .put('/api/users/2')
      .send(payload)
      .set('Accept', 'application/json')
      .set('x-api-key', process.env.API_KEY);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(payload.name);
    expect(response.body.job).toBe(payload.job);
    expect(response.body).toHaveProperty('updatedAt');
  });

  // PATCH
  it('PATCH /users/:id - should update a user with PATCH method', async () => {
    const payload = {
        name: process.env.USER_NAME_UPDATE,
        job: process.env.USER_JOB_UPDATE
    };

    const response = await request(process.env.BASE_URL)
      .put('/api/users/2')
      .send(payload)
      .set('Accept', 'application/json')
      .set('x-api-key', process.env.API_KEY);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(payload.name);
    expect(response.body.job).toBe(payload.job);
    expect(response.body).toHaveProperty('updatedAt');
  });

  // DELETE
  it('DELETE /users/:id - should delete a user', async () => {
    const response = await request(process.env.BASE_URL)
      .delete('/api/users/2')
      .set('x-api-key', process.env.API_KEY);

    expect(response.status).toBe(204);
  });
});
