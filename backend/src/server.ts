import express from 'express' // ECM ecmascript modules
import cors from 'cors'
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'
import { corsConfig } from './config/cors'

connectDB()

const app = express() // Aplicacion principal

// Aplicar la configuracion 'cors' en todo el proyecto
app.use(cors(corsConfig))

// Leer datos de formularios
app.use(express.json())

// Utilizar dominio principal del proyecto
app.use('/', router) 

export default app
