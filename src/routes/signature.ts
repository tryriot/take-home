import {Request, Response, Router} from "express";
import {generateHmacSignature, verifyHmacSignature} from "../services/signatureService";

export const signatureRouter = Router();
const secretKey = 'mysecret';

signatureRouter.post('/sign', (req: Request, res: Response) => {
    const signature = generateHmacSignature(req.body, secretKey);
    res.json({ signature });
});

signatureRouter.post('/verify', (req: Request, res: Response) => {
    const { signature, data } = req.body;

    if (verifyHmacSignature(data, signature, secretKey)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(400);
    }
});