export interface EncryptionAlgorithm {
    encrypt: (data: string) => string;
    decrypt: (data: string) => string;
}

export class Base64Algorithm implements EncryptionAlgorithm {
    encrypt(data: string): string {
        return Buffer.from(data).toString('base64');
    }

    decrypt(data: string): string {
        return Buffer.from(data, 'base64').toString('utf-8');
    }
}