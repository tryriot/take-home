import {EncryptionAlgorithm} from "./encryptionAlgorithm";

type EncryptedObject = {
  [key: string]: string;
};

type DecryptedObject = {
  [key: string]: any;
};

/**
 * Service for encrypting and decrypting objects using a specified algorithm.
 */
export class EncryptionService {
  private algorithm: EncryptionAlgorithm;

  constructor(algorithm: EncryptionAlgorithm) {
    this.algorithm = algorithm;
  }

  /**
   * Sets a new encryption algorithm.
   * @param algorithm - The new encryption algorithm to use.
   */
  setAlgorithm(algorithm: EncryptionAlgorithm) {
    this.algorithm = algorithm;
  }

  /**
   * Encrypts every value in the object.
   * @param obj - The object to encrypt.
   * @returns The encrypted object.
   */
  encryptObject = (obj: any): EncryptedObject => {
    const encryptedObj: EncryptedObject = {};
    Object.entries(obj).forEach(([key, value]) => {
      encryptedObj[key] = this.algorithm.encrypt(JSON.stringify(value));
    });
    return encryptedObj;
  };

  /**
   * Decrypts every value in the object.
   * @param obj - The encrypted object.
   * @returns The decrypted object.
   */
  decryptObject = (obj: EncryptedObject): DecryptedObject => {
    const decryptedObj: DecryptedObject = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        try {
          decryptedObj[key] = JSON.parse(this.algorithm.decrypt(obj[key]));
        } catch (e) {
          decryptedObj[key] = this.algorithm.decrypt(obj[key]);
        }
      }
    }
    return decryptedObj;
  };
}

