import { getRepository, Repository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { UserEntity } from "../entity/User";
import * as bcrypt from 'bcryptjs'




export class UserController {

    public async register(request: Request, response: Response) {
        const { username, email, password } = request.body
        const hashPassword = await bcrypt.hash(password, 8)
        let users = await getRepository(UserEntity).findOne({ where: { username } })
        if (users) {
            return response.status(404).json({
                message: "用户已存在"
            })
        }
        const user = await getRepository(UserEntity).save({
            username,
            email,
            password: hashPassword
        })
        return response.json(user)
    }

    public async login(req: Request, res: Response) {
        const { username, password } = req.body
        const users = await getRepository(UserEntity).find({
            where: {
                username
            }
        })
        if (users.length === 1) {
            if (!users || !await bcrypt.compare(password, users[0].password)) {

                return res.status(404).json({
                    message: "用户/密码不正确"
                })
            } else {
                const token = jwt.sign({ id: users[0].id }, process.env.APP_SERCRE, {
                    expiresIn: '7d'
                })
                const data = {
                    id: users[0].id,
                    username: users[0].username,
                    email: users[0].email,
                    token
                }
                return res.json(data)
            }
        } else {
            return res.status(404).json({
                message: " user not foud"
            })
        }
    }

    public async userAll(req: Request, res: Response) {
        const users = await getRepository(UserEntity).find()
        return res.json(users)
    }

}

