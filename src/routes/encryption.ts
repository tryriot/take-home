import {Request, Response, Router} from "express";
import {EncryptionService} from "../services/encryptionService";
import {Base64Algorithm} from "../services/encryptionAlgorithm";

export const encryptionRouter = Router();
const encryptionService = new EncryptionService(new Base64Algorithm())

encryptionRouter.post('/encrypt', (req: Request, res: Response) => {
    const encryptedPayload = encryptionService.encryptObject(req.body);
    res.json(encryptedPayload);
});

encryptionRouter.post('/decrypt', (req: Request, res: Response) => {
    const decryptedPayload = encryptionService.decryptObject(req.body);
    res.json(decryptedPayload);
});