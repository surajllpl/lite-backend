const User = require('../models/userModel');
const Jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const jwtKey = require('../config/authConfig');


//const jwtKey = 'lite-server'; // .env 

exports.createUser = async (req, res) => {
    try {
        //const hashedPassword = await  bcrypt.hashSync(req.body.password, 8);

        const { name, role, contact, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword, req.body);
        const user = await User.create({ name, role, contact, password: hashedPassword });
        return res.status(201).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.userLogin = async (req, res) => {
    try {
        const { contact, password } = req.body;
        const user = await User.findOne({ where: { contact } });
        if (user) {
            // const pm = await bcrypt.compare(password, user.password);
            const pm = await bcrypt.compare(password,user.password);

            console.log(pm,password,user.password)
            if (!pm) {
                return res.status(401).json({ error: 'wrong or not match password' });
            }
            Jwt.sign({ user }, jwtKey.secret, { expiresIn: "20h" }, (err, token) => {
                if (err) {
                    res.status(411).json({ error: 'something went wrong' });

                }

                //  const { password, ...userWithoutPassword } = user.toObject();
                res.status(201).json({ user, auth: token });
            })
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { name, role, contact, password } = req.body;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.name = name;
        user.role = role;
        user.contact = contact;
        user.password = password;
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.destroy();
        return res.status(204).send();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};