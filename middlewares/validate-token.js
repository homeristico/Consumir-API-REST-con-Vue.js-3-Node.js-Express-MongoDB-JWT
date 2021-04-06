const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error:'acceso denegado'});

    try {
        const verify = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verify;
        next(); //continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es valido'});
    }
}

module.exports = verifyToken;