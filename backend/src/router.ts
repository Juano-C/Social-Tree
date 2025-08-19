import { createAccount, login, getUser, updateProfile, uploadImage, getUserByHandle, searchByHandle } from './handlers'
import { handleInputError } from './middleware/validation'
import { authenticate } from './middleware/auth'
import { Router } from 'express'
import { body } from 'express-validator' // Libreria para verificar si los datos ingresados son permitidos

const router = Router()

/** Autenticacion y registro */
router.post('/auth/register',

    // Mensaje de error del handle
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),

    // Mensaje de error del name
    body('name')
        .notEmpty()
        .withMessage('El name no puede ir vacio'),

    // Mensaje de error del email 
    body('email')
        .isEmail()
        .withMessage('El email no valido'),

    // Mensaje de error del password
    body('password')
        .isLength({ min: 8 })
        .withMessage('El password debe tener minimo 8 caracteres'),

    handleInputError, // Manejar los posibles mensajes de error
    createAccount
)

router.post('/auth/login',
    // Mensaje de error del email
    body('email')
        .isEmail()
        .withMessage('El email no valido'),

    // Mensaje de error del password
    body('password')
        .notEmpty()
        .withMessage('El password es obligatorio'),
    handleInputError, // Manejar los posibles mensajes de error
    login
)

// EndPoint para obtener usuario autenticado
router.get('/user', authenticate, getUser)
router.patch('/user',
    // Mensaje de error del handle
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),


    handleInputError,
    authenticate,
    updateProfile
)

router.post('/user/image', authenticate, uploadImage)

router.get('/:handle', getUserByHandle)

router.post('/search',
        // Mensaje de error del name
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    handleInputError, 
    searchByHandle
)

export default router
