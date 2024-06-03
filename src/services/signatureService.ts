import crypto from 'crypto';

type Payload = any;

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

