"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // ECM ecmascript modules
const app = (0, express_1.default)();
// Routing: ventanas de la pagina principal '/' en "app"
app.get('/', (req, res) => {
    res.send('ventana princial');
});
//puerto 
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log('Servidor Funcionando en el puerto:', port);
});
//# sourceMappingURL=index.js.map