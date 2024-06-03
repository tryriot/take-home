import { Router, Request, Response } from 'express';
import { decryptObject } from '../services/encryptionService';

export const decryptRouter = Router();

decryptRouter.post('/', (req: Request, res: Response) => {
    const decryptedPayload = decryptObject(req.body);
    res.json(decryptedPayload);
});
