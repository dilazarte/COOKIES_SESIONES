const express = require('express')
const handlebars = require('express-handlebars');
const path =  require('path');
const port = 8080
const app = express()
const session = require('express-session');
const MongoStore = require('connect-mongo');

//rutas
const adminRouter = require('./routes/admin');
const chatsRouter = require('./routes/chatRoutes')
const prodTest = require('./routes/productosRoutes')
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');


//para recibir json desde post
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));


app.engine(
    'hbs',
    handlebars.engine({
        extname:'.hbs',
        defaultLayout: path.join(__dirname, './views/layaouts/index.hbs'),
        layoutsDir:path.join(__dirname, './views/layaouts'),
        partialsDir: path.join(__dirname,'./views/partials')
    })
);
app.use(express.static(path.join(__dirname, '/public')));

//configurando sesiones en mongo.-
const mongoOptions = {useNewUrlParser: true, useUnifiedTopology: true}
app.use(session({
    store: MongoStore.create({
        mongoUrl:"mongodb+srv://dilazarte:123456.@cluster0.k7tpv.mongodb.net/sesiones?retryWrites=true&w=majority",
        ongoOptions: mongoOptions
    }),
    cookie: {maxAge: 120000},
    secret:"sesionSecreta123",
    resave:false,
    saveUninitialized:false,
    rolling:true
}))

app.use('/api/productos', prodTest)
app.use('/api/chat', chatsRouter)
app.use('/login', loginRouter)
app.use('/logout', logoutRouter)
app.use('/admin', adminRouter)


const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

io.on('connection', (socket) => {
    console.log(`Usuario conectado ${socket.id} - ${socket.handshake.address}`);
    
    socket.emit('msg', '')
    socket.on('newMsg', ()=>{
        io.sockets.emit('msg', '')
    })
});

const serverON = httpServer.listen(port, ()=>{
    console.log(`Server on port ${port}`)
})
serverON.on('error', error=> console.log(`Error del servidor ${error}`))

// app.listen(port, ()=>{
//     console.log(`Server on port ${port}`)
// })