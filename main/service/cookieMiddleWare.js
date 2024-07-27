import { jwtAuthFunc as jwtAuthFuncVar } from '../service/jwtAuth.js';

function validateCookie(cookieName) {
    return (req, res, next) => {
        const cookieVal = req.cookies[cookieName];
        if(!cookieVal) {
            return next();
        }
        try {
            const userPayload = jwtAuthFuncVar.validateToken(cookieVal);
            req.user=userPayload;
        } catch (error) {}
        return next();
    };
}

export const cookieMiddleFunc = {validateCookie};