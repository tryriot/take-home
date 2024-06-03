import { Buffer } from 'buffer';

export const encryptObject = (obj: any): any => {
  const encryptedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      encryptedObj[key] = Buffer.from(JSON.stringify(obj[key])).toString('base64');
    }
  }
  return encryptedObj;
};

export const decryptObject = (obj: any): any => {
  const decryptedObj: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      try {
        decryptedObj[key] = JSON.parse(Buffer.from(obj[key], 'base64').toString('utf-8'));
      } catch (e) {
        decryptedObj[key] = Buffer.from(obj[key], 'base64').toString('utf-8');
      }
    }
  }
  return decryptedObj;
};