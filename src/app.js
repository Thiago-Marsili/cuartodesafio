import express from 'express'
import { Server } from 'socket.io'
import __dirname from './utils.js'
import handlebars from 'express-handlebars'
import viewsRouters from './routes/views.routes.js'

const productos = [];

const PORT = 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname+'/public'))

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname+'/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouters, productos)
app.use('/realtimeproducts', viewsRouters)

const httpServer = app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`)
})

const io = new Server(httpServer)


io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.emit('productos', productos);

    socket.on('agregarProducto', (producto) => {
        productos.push(producto);
        console.log(productos)
        io.emit('productos', productos);
    });

    socket.on('eliminarProducto', (index) => {
        productos.splice(index, 1);
        io.emit('productos', productos);
    });

    socket.on('actualizarProducto', ({ index, nuevoProducto }) => {
        productos[index] = nuevoProducto;
        io.emit('productos', productos);
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado');
    });
});

export default productos;