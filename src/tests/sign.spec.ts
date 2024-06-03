import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import crypto from 'crypto';

describe('Sign API', () => {
    it('should generate a HMAC signature for the payload', async () => {
        const payload = { foo: "bar" };
        const secret = "mysecret";

        const res = await request(app).post('/sign').send(payload);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('signature');

        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(JSON.stringify(payload));
        const expectedSignature = hmac.digest('hex');

        expect(res.body.signature).to.equal(expectedSignature);
    });
});
