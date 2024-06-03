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