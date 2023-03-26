import { Router } from 'express'

import usersControllers from '../controllers/users.controller'
import authMiddlewares from '../middlewares/auth.middleware'
import usersMiddlewares from '../middlewares/users.middleware'

const router = Router()

router

    .get('/', authMiddlewares.checkAdminAuth, usersControllers.getAllUsers)

    .put(
        '/profile',
        [authMiddlewares.checkAuth, usersMiddlewares.checkUserProfile],
        usersControllers.changeProfile
    )

// .put('/picture', usersControllers.changePicture)

// .get('/register', usersController.registerUser)

// .post('/login', usersController.loginUser)

export default router
