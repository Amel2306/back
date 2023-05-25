const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const decodedToken = jwt.verify(token, 'ceci_est_une_clée_secrette');
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.email === 'ameladdou213@gmail.com') {
        next();
    } else {
        res.status(403).json({ message: 'Accès non autorisé. Réservé aux administrateurs.' });
    }
};