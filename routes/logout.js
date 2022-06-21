const express = require('express')
const {Router} = express

const logoutRouter = Router()

logoutRouter.get('/', (req, res)=>{
    let name = req.session.user
    req.session.destroy(err =>{
        if(err){ console.log('error al cerrar sesion') }
    })
    res.render('logout', {name: name})
})


module.exports= logoutRouter