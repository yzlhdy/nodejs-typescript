import { Request, Response, Router } from 'express'
import multer = require('multer')
import { multerConfig } from './config/multer'
import { UserController } from './controller/user.controller'
import { auth } from './middlewares/auth'

const usercontrl = new UserController()

const router: Router = Router()

router.get('/', (req: Request, res: Response) => {
    return res.json({
        message: "hello world"
    })
})

router.get('/user', usercontrl.userAll)
router.post('/register', usercontrl.register)

router.post('/upload', multer(multerConfig).single('file'), (request: Request, response: Response) => {

    console.log(request.file)

    return response.json({ message: 'Imagem enviada' })
})
router.use(auth)
router.post('/login', usercontrl.login)
export default router