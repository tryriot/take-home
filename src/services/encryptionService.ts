import { Buffer } from 'buffer';
import { EncryptionAlgorithm, Base64Algorithm } from './encryptionAlgorithm';

const algorithm: EncryptionAlgorithm = new Base64Algorithm();

export const encryptObject = (obj: any): any => {
  const encryptedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      encryptedObj[key] = algorithm.encrypt(JSON.stringify(obj[key]));
    }
  }
  return encryptedObj;
};

export const decryptObject = (obj: any): any => {
  const decryptedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      try {
        decryptedObj[key] = JSON.parse(algorithm.decrypt(obj[key]));
      } catch (e) {
        decryptedObj[key] = algorithm.decrypt(obj[key]);
      }
    }
  }
  return decryptedObj;
};