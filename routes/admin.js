const express = require('express')
const {Router} = express
const { authCheck } = require('../middlewares/authCheck')

const adminRouter = Router()

adminRouter.get('/', authCheck,(req, res)=>{
    res.render('admin', {name: req.session.user})
})

module.exports= adminRouter