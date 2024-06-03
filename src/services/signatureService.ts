import crypto from 'crypto';

const secretKey = 'mysecret';

export const generateHmacSignature = (payload: any, secret: string = secretKey): string => {
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(JSON.stringify(payload));
    return hmac.digest('hex');
};

export const verifyHmacSignature = (payload: any, signature: string, secret: string = secretKey): boolean => {
    const expectedSignature = generateHmacSignature(payload, secret);
    return expectedSignature === signature;
};
