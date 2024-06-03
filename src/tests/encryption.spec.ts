import { expect } from 'chai';
import request from 'supertest';
import app from '../app';

describe('Encryption API', () => {
  it('should encrypt every value in the object', async () => {
    const payload = {
      foo: "foobar",
      bar: {
        isBar: true
      }
    };

    const res = await request(app).post('/encrypt').send(payload);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('foo');
    expect(res.body.foo).to.be.a('string');
    expect(res.body).to.have.property('bar');
    expect(res.body.bar).to.be.a('string');
  });

  it('should decrypt every encrypted value in the object', async () => {
    const encryptedPayload = {
      foo: Buffer.from("foobar").toString('base64'),
      bar: Buffer.from(JSON.stringify({ isBar: true })).toString('base64')
    };

    const res = await request(app).post('/decrypt').send(encryptedPayload);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('foo', 'foobar');
    expect(res.body).to.have.property('bar');
    expect(JSON.parse(res.body.bar)).to.deep.equal({ isBar: true });
  });
});