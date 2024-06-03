import {Request, Response, Router} from "express";
import {generateHmacSignature, verifyHmacSignature} from "../services/signatureService";

// Router for signature-related endpoints
export const signatureRouter = Router();

// Secret key used for generating and verifying HMAC signatures
const secretKey = 'mysecret';

/**
 * POST /sign
 * Endpoint for generating an HMAC signature for the request body.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
signatureRouter.post('/sign', (req: Request, res: Response) => {
    // Generate HMAC signature for the request body
    const signature = generateHmacSignature(req.body, secretKey);
    res.json({signature});
});

/**
 * POST /verify
 * Endpoint for verifying an HMAC signature for the request body.
 * @param {Request} req - The Express Request object.
 * @param {Response} res - The Express Response object.
 */
signatureRouter.post('/verify', (req: Request, res: Response) => {
    const {signature, data} = req.body;

    // Verify HMAC signature for the request body
    if (verifyHmacSignature(data, signature, secretKey)) {
        // If signature is valid, send a 204 (No Content) response
        res.sendStatus(204);
    } else {
        // If signature is invalid, send a 400 (Bad Request) response
        res.sendStatus(400);
    }
});
