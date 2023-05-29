const User = require('../models/User')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

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
    const { nom, prenom, email, mdp } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(mdp, 10); // Génère le hachage du mot de passe avec un coût de 10
      const newUser = await User.create({ nom, prenom, email, mdp: hashedPassword });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error });
    }
  };

exports.updateUser = async (req, res) => {
    const { nom, prenom, email,mdp } = req.body;
    const userId = req.params.id;

    try {
        let hashedPassword = null;
        //let updateFields = { nom, prenom, email };
        if (mdp) {
            hashedPassword = await bcrypt.hash(mdp, 10);
          //updateFields.mdp = hashedPassword;
        }
    
        const [updatedRows] = await User.update({ nom, prenom, email, mdp: hashedPassword }, { where: { id: userId } });

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

