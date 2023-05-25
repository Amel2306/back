const User = require('../models/User')
const jwt = require("jsonwebtoken");

/*function extractUserId(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return null;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return null;
    }
    try {
        const secretKey = "ceci_est_une_clée_secrette";
        const decodedToken = jwt.verify(token, secretKey);
        return decodedToken.userId;
    } catch (err) {
        console.error(err);
        return null;
    }
}

exports.getUserByToken = async (req, res) => {
    const userId = extractUserId(req);
    if (userId) {
        const user = await User.findByPk(userId);
        res.send(user);
    } else {
        res.status(401).send({ error: "Unauthorized" });
    }
};*/

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.createUser = async (req, res) => {
    const { nom, prenom, email,mdp } = req.body;

    try {
        const newUser = await User.create({ nom, prenom, email,mdp });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};

exports.updateUser = async (req, res) => {
    const { nom, prenom, email,mdp } = req.body;
    const userId = req.params.id;

    try {
        const [updatedRows] = await User.update({ nom, prenom, email, mdp }, { where: { id: userId } });

        if (updatedRows > 0) {
            res.status(200).json({ message: 'user updated successfully' });
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedRows = await User.destroy({ where: { id: userId } });

        if (deletedRows > 0) {
            res.status(200).json({ message: 'user deleted successfully' });
        } else {
            res.status(404).json({ message: 'user not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
};

