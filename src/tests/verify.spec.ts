import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import crypto from 'crypto';

describe('Verify API', () => {
    it('should return 204 if the signature is valid', async () => {
        const payload = { foo: "bar" };
        const secret = 'mysecret';
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(JSON.stringify(payload));
        const signature = hmac.digest('hex');

        const res = await request(app).post('/verify').send({
            signature,
            data: payload
        });

        expect(res.status).to.equal(204);
    });

    it('should return 400 if the signature is invalid', async () => {
        const payload = { foo: "bar" };
        const invalidSignature = 'invalidsignature';

        const res = await request(app).post('/verify').send({
            signature: invalidSignature,
            data: payload
        });

        expect(res.status).to.equal(400);
    });
});
