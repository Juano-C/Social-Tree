import bcrypt from 'bcrypt' // Dependencia para hashear passwords

// Funcion que Hashea el password
export const hashPassword = async (password : string) => {
    // Genera cadena aleatoria para no almacenar misma contraseña, aumentando la seguridad (mas alto el genSalt, mas seguridad y mas lento el programa)
    const salt = await bcrypt.genSalt(10)

    // await espera a que la funcion de arriba termine.
    return await bcrypt.hash(password, salt) 
}

// Check del password ingresado y el password guardado en base de dato
export const checkPassword = async (enteredPassword: string, hash: string) => {

    // Con "bcrypt" comparo la contraseña ingresada y la contraseña hasheada (true o false)
    return await bcrypt.compare(enteredPassword, hash)
}
