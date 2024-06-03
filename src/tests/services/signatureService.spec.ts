import {expect} from 'chai';
import {generateHmacSignature, verifyHmacSignature} from '../../services/signatureService';

describe('HMAC Service', () => {
    const secret = 'mysecret';

    describe('generateHmacSignature', () => {
        it('should generate a valid HMAC signature', () => {
            const payload = {foo: 'bar'};
            const signature = generateHmacSignature(payload, secret);

            expect(signature).to.be.a('string');
            expect(signature).to.have.lengthOf(64); // HMAC-SHA256 signature length
        });

        it('should throw an error if payload is null or undefined', () => {
            expect(() => generateHmacSignature(null, secret)).to.throw('Payload cannot be null or undefined');
            expect(() => generateHmacSignature(undefined, secret)).to.throw('Payload cannot be null or undefined');
        });

        it('should throw an error if secret is null or undefined', () => {
            const payload = {foo: 'bar'};
            expect(() => generateHmacSignature(payload, null as any)).to.throw('Secret cannot be null or undefined');
            expect(() => generateHmacSignature(payload, undefined as any)).to.throw('Secret cannot be null or undefined');
        });
    });

    describe('verifyHmacSignature', () => {
        it('should return true for a valid signature', () => {
            const payload = {foo: 'bar'};
            const signature = generateHmacSignature(payload, secret);

            const isValid = verifyHmacSignature(payload, signature, secret);

            expect(isValid).to.be.true;
        });

        it('should return false for an invalid signature', () => {
            const payload = {foo: 'bar'};
            const invalidSignature = 'invalidsignature';

            const isValid = verifyHmacSignature(payload, invalidSignature, secret);

            expect(isValid).to.be.false;
        });

        it('should throw an error if signature is null, undefined, or not a string', () => {
            const payload = {foo: 'bar'};
            expect(() => verifyHmacSignature(payload, null as any, secret)).to.throw('Signature must be a non-empty string');
            expect(() => verifyHmacSignature(payload, undefined as any, secret)).to.throw('Signature must be a non-empty string');
        });

        it('should throw an error if secret is null or undefined', () => {
            const payload = {foo: 'bar'};
            const signature = generateHmacSignature(payload, secret);

            expect(() => verifyHmacSignature(payload, signature, null as any)).to.throw('Secret cannot be null or undefined');
            expect(() => verifyHmacSignature(payload, signature, undefined as any)).to.throw('Secret cannot be null or undefined');
        });
    });
});
