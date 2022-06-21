const express = require('express')
const {Router} = express

const loginRouter = Router()

loginRouter.get('/', (req, res)=>{
    res.render('login')
})

loginRouter.post('/', (req, res)=>{
    const {user, pass} = req.body
    //validando datos de formulario...
    if(user == 'david' && pass == '123456') {
        req.session.user = user;
        req.session.logged = true;
    } else {
        return res.send('Usuario o contraseña incorrecto')
    }
    //return res.send('Login success')
    return res.redirect('admin')
})

module.exports= loginRouter