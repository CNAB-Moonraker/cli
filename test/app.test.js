const app = require("../server/app");
const request = require('supertest');
const assert = require('assert');

describe('GET /claims', async function() {
 it('Responds with JSON content', function(done) {
   request(app)
     .get('/claims')
     .expect('Content-Type', /json/)
     .expect(200)
     .then(response => {
         assert(response.body.porter instanceof Array)
     })
     .then(done)
     .catch(err => {
         done(err)
     })
 });
});
