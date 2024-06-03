import { expect } from 'chai';
import crypto from 'crypto';
import { generateHmacSignature, verifyHmacSignature } from '../../services/signatureService';

describe('Signature Service', () => {
    describe('generateHmacSignature function', () => {
        it('should generate HMAC signature for the payload using the secret key', () => {
            const payload = {
                foo: 'bar',
                baz: 123
            };
            const secretKey = 'mysecret';

            const generatedSignature = generateHmacSignature(payload, secretKey);

            // On génère la signature pour vérifier son format
            const expectedHmac = crypto.createHmac('sha256', secretKey).update(JSON.stringify(payload)).digest('hex');
            expect(generatedSignature).to.equal(expectedHmac);
        });

        it('should throw an error if the payload is null', () => {
            const payload = null;
            const secretKey = 'mysecret';

            expect(() => generateHmacSignature(payload, secretKey)).to.throw('Payload cannot be null or undefined');
        });

        it('should throw an error if the payload is undefined', () => {
            const payload = undefined;
            const secretKey = 'mysecret';

            expect(() => generateHmacSignature(payload, secretKey)).to.throw('Payload cannot be null or undefined');
        });
    });

    describe('verifyHmacSignature function', () => {
        it('should return true if the signature is valid', () => {
            const payload = {
                foo: 'bar',
                baz: 123
            };
            const secretKey = 'mysecret';
            const signature = generateHmacSignature(payload, secretKey);

            const isValid = verifyHmacSignature(payload, signature, secretKey);

            // Vérifie que la fonction retourne true si la signature est valide
            expect(isValid).to.be.true;
        });

        it('should return false if the signature is invalid', () => {
            const payload = {
                foo: 'bar',
                baz: 123
            };
            const secretKey = 'mysecret';
            const signature = 'invalidSignature';

            const isValid = verifyHmacSignature(payload, signature, secretKey);

            // Vérifie que la fonction retourne false si la signature est invalide
            expect(isValid).to.be.false;
        });
    });
});
