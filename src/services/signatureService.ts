import crypto from 'crypto';

type Payload = any;

/**
 * Generate HMAC signature for the given payload and secret.
 * @param {Payload} payload - The payload to generate the signature for.
 * @param {string} secret - The secret key used for generating the HMAC signature.
 * @returns {string} - The HMAC signature.
 * @throws {Error} - If the payload or secret is null or undefined.
 */
export const generateHmacSignature = (payload: Payload, secret: string): string => {
    if (!payload) {
        throw new Error('Payload cannot be null or undefined');
    }
    if (!secret) {
        throw new Error('Secret cannot be null or undefined');
    }
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(payload));
    return hmac.digest('hex');
};

/**
 * Verify if the given signature matches the expected HMAC signature for the payload and secret.
 * @param {Payload} payload - The payload to verify the signature for.
 * @param {string} signature - The signature to verify.
 * @param {string} secret - The secret key used for generating the HMAC signature.
 * @returns {boolean} - True if the signature is valid, false otherwise.
 * @throws {Error} - If the signature or secret is null, undefined, or not a non-empty string.
 */
export const verifyHmacSignature = (payload: Payload, signature: string, secret: string): boolean => {
    if (!signature) {
        throw new Error('Signature must be a non-empty string');
    }
    if (!secret) {
        throw new Error('Secret cannot be null or undefined');
    }
    const expectedSignature = generateHmacSignature(payload, secret);
    return expectedSignature === signature;
};
