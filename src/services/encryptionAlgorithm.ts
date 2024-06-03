/**
 * Interface representing an encryption algorithm.
 */
export interface EncryptionAlgorithm {
    /**
     * Encrypts the given data using the algorithm.
     * @param {string} data - The data to encrypt.
     * @returns {string} - The encrypted data.
     */
    encrypt: (data: string) => string;

    /**
     * Decrypts the given data using the algorithm.
     * @param {string} data - The data to decrypt.
     * @returns {string} - The decrypted data.
     */
    decrypt: (data: string) => string;
}

/**
 * Class representing the Base64 encryption algorithm.
 * Implements the EncryptionAlgorithm interface.
 */
export class Base64Algorithm implements EncryptionAlgorithm {
    /**
     * Encrypts the given data using the Base64 algorithm.
     * @param {string} data - The data to encrypt.
     * @returns {string} - The encrypted data.
     */
    encrypt(data: string): string {
        return Buffer.from(data).toString('base64');
    }

    /**
     * Decrypts the given data using the Base64 algorithm.
     * @param {string} data - The data to decrypt.
     * @returns {string} - The decrypted data.
     */
    decrypt(data: string): string {
        return Buffer.from(data, 'base64').toString('utf-8');
    }
}
