import colors from 'colors'
import server from "./server"

//puerto
const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.magenta.bold  (`Servidor Funcionando en el puerto: ${port}`))
})

const numbers = [10, 20, 30]
