import {EncryptionAlgorithm} from "./encryptionAlgorithm";

export class EncryptionService {

  constructor(private algorithm: EncryptionAlgorithm) {}

  encryptObject = (obj: any): any => {
    const encryptedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        encryptedObj[key] = this.algorithm.encrypt(JSON.stringify(obj[key]));
      }
    }
    return encryptedObj;
  };

  decryptObject = (obj: any): any => {
    const decryptedObj: any = {};
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