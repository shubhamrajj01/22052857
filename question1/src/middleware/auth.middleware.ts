import { Request, Response, NextFunction } from 'express';

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
import jwt from 'jsonwebtoken'; 
import logger from '../utils/logger';


const JWT_SECRET = 'VKMuRKVCdRBfMffK'; 
export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            error: 'Authorization header is missing'
        });
    }

    const token = authHeader.split(' ')[1]; 

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET); 
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp && now >= decoded.exp) {
            logger.error('Authentication token has expired');
            return res.status(401).json({
                success: false,
                error: 'Authentication token has expired'
            });
        }

        req.user = decoded; 
        next();
    } catch (error) {
        logger.error('Invalid authentication token', error);
        return res.status(401).json({
            success: false,
            error: 'Invalid authentication token'
        });
    }
};