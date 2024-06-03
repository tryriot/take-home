import { Request, Response, Router } from "express";
import { EncryptionService } from "../services/encryptionService";
import { Base64Algorithm } from "../services/encryptionAlgorithm";

const encryptionService = new EncryptionService(new Base64Algorithm());
export const encryptionRouter = Router();

/**
 * Endpoint POST /encrypt.
 * Encrypts the request body using the configured encryption algorithm.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
encryptionRouter.post('/encrypt', (req: Request, res: Response) => {
    const encryptedPayload = encryptionService.encryptObject(req.body);
    res.json(encryptedPayload);
});

/**
 * Endpoint POST /decrypt.
 * Decrypts the request body using the configured encryption algorithm.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
encryptionRouter.post('/decrypt', (req: Request, res: Response) => {
    const decryptedPayload = encryptionService.decryptObject(req.body);
    res.json(decryptedPayload);
});
