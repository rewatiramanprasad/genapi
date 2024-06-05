import { expect } from 'chai';
// const expect=chai.expect;?
// const request=require('supertest');
import request from 'supertest';
import  {app}  from '../index.js';
// import express from 'express';

// const app = express();
// app.use(express.json());
// app.listen(5453);

describe('POST /api', function ()  {
  this.timeout(5000);
    it('should return 400 if prompt is empty', async () => {
      const res = await request(app)
        .post('/api')
        .send({ prompt: '' });
      // console.log(res.status,res.body)
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'invalidInput:prompt is required');
    });

    it('should return 400 if prompt is missing', async () => {
      const res = await request(app)
        .post('/api')
        .send({ promt: '' });
      // console.log(res.status,res.body)
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('message', 'invalidInput:prompt is required');
    });
    it('should return 200 if prompt is passing successfully', async () => {
      // this.timeout(5000);
      const res = await request(app)
        .post('/api')
        .send({ prompt: 'write a hello world in python' });
      console.log(res.status,res.body)
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'data Fetched from gemini');
    });
    
});

describe('GET /hello', () => {
  // this.timeout(5000);
it('should return 200 ', async () => {
  const res = await request(app)
    .get('/hello')
    // .send({ prompt: '' });
  console.log(res.status,res.body)
  expect(res.status).to.equal(200);
  expect(res.body).to.have.property('message', 'hello world');
})
});