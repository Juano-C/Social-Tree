import jwt, { JwtPayload} from 'jsonwebtoken' // Permite crear y validar los JWT

export const generateJWT = (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d'
    })
    return token
}
