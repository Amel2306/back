const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//const _ = require("lodash");

exports.signup = async (req, res) => {
    const { nom, prenom, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ where: { email: req.body.email } });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists, please login" });
        }
        bcrypt.hash(password, 10, async function (err, hash) {
            if (err) {
                return res.status(400).json({ message: "Can't use this password", err });
            }
            try {
                const newUser = await User.create({ nom, prenom, email, mdp: hash });
                const secretKey = "ceci_est_une_clée_secrette";
                const payload = {email: email, id: newUser.id };
                const options = { expiresIn: '24h' };
                try {
                    const token = jwt.sign(payload, secretKey, options);
                    return res.status(201).json({ newUser, token });
                }
                catch(error) {
                    return res.status(400).json({ message: 'Error with creating token', error });
                }

            } catch (error) {
                return res.status(400).json({ message: 'Error creating user', error });
            }
        });
    } catch (error) {
        return res.status(400).json({ message: 'Error signup user', error });
    }
};

exports.login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            const hashPw = existingUser.mdp
            bcrypt.compare(password, hashPw, async function(err, result) {
                if (result) {
                    const payload = { email: email, id: existingUser.id };
                    const secretKey = "ceci_est_une_clée_secrette";
                    const options = { expiresIn: '24h' };
                    try {
                        const token = jwt.sign(payload, secretKey, options);
                        return res.status(201).json({ existingUser, token });
                    }
                    catch(error) {
                        return res.status(400).json({ message: 'Error with creating token', error });
                    }
                }
                else {
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
            })
        }
        else {
            return res.status(404).json({message: "user not exists, please signup"})
        }
    }
    catch (error) {
        return res.status(400).json({ message: 'Error logging user', error });
    }
}

exports.logout = async (req, res) => {
    try {
        // Trouver l'utilisateur connecté
        const user = await User.findByPk(req.user.id);

        // Supprimer le token
        user.token = null;
        await user.save();

        // Envoyer la réponse
        res.status(200).json({ message: 'Déconnexion réussie' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur de serveur' });
    }
};