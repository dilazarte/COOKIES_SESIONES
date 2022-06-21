function authCheck(req, res, next){
    if(req.session?.logged) {
        return next();
    }
    return res.status(401).send('Debe iniciar Sesion!')
}

module.exports = {authCheck}