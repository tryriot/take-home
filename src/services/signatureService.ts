import crypto from 'crypto';

export const generateHmacSignature = (payload: any, secret: string): string => {
    if (!payload) {
        throw new Error('Payload cannot be null or undefined');
    }
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(payload));
    return hmac.digest('hex');
};

export const verifyHmacSignature = (payload: any, signature: string, secret: string): boolean => {
    const expectedSignature = generateHmacSignature(payload, secret);
    return expectedSignature === signature;
};
