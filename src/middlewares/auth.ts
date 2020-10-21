import { NextFunction, Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'


export const auth = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(404).json({
            message: ' Token is required'
        })
    }
    if (authHeader.split(' ')[0] !== 'Bearer') {
        res.status(404).json({
            message: "token不正确"
        })
    }
    const [, token] = authHeader.split(' ')

    try {
        await jwt.verify(token, process.env.APP_SERCRE)
        next()
    } catch (error) {
        console.log(error);

        return res.status(404).json({
            message: "Token is error"
        })
    }


}