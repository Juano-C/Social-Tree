import type { Request, Response, NextFunction } from 'express'; // NextFunction para que luego vaya a 'Login' o 'createAccount' respectivamente
import { validationResult } from 'express-validator'; // Para que 'validationResult' logre compilar

// Middleware: utilizar codigo reutilizable para crear cuenta y logear cuenta
export const handleInputError = (req: Request, res: Response, next: NextFunction) => {
    // Manejar errores
    let errors = validationResult(req)

    // Si hay error con el handler, lo captura y manda mensaje
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    next() // si no hay errores, va a la siguiente funcion
}