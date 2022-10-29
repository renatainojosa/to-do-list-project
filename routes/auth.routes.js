const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = require('express').Router();

//middlewares ?

const User = require('../models/User.model');

const saltRounds = 10;

router.post('/signup', async (req, res, next) => {
    const {username, email, password} = req.body;
    try {
        if (!username || !email || !password) {
            const error = new Error('Campos de preenchimento obrigatório!');
            error.status = 400;
            throw error;
        }        

    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt);

    const userFromDB = await User.create({
        username,
        email,
        passwordHash: hash,
    });

    res.status(201).json(userFromDB);
    } catch (error) {
        if(error instanceof mongoose.Error.ValidationError) {
            res.status(400).json(error.message);
            return;
        }
        if (error.code === 11000) {
            res.status(500).json('Nome de usuário ou email já existe');
            return;
        }
        next(error);
    }
}); 

router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json('Campos de email e senha obrigatórios!')
        }
        const userFromDB = await User.findOne({ email });

        if(!userFromDB) {
            return res.status(401).json('Usuário ou senha não encontrado!');
        }

        const verify = bcrypt.compareSync(password, userFromDB.passwordHash);

        if(!verify) {
            return res.status(401).json('Usuário ou senha não encontrado!')
        }

        const payload = {
            _id: userFromDB._id,
            username: userFromDB.username,
            email: userFromDB.email,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                algorithm: "HS256",
                expiresIn: '24h'
            }
        )

        res.status(200).json({ token });

    } catch (error) {
        next(error);
    }
});


module.exports = router;