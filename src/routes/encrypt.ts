import { Router, Request, Response } from 'express';
import { encryptObject } from '../services/encryptionService';

export const encryptRouter = Router();

encryptRouter.post('/', (req: Request, res: Response) => {
  const encryptedPayload = encryptObject(req.body);
  res.json(encryptedPayload);
});