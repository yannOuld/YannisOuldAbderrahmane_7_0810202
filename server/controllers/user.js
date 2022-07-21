const db = require('../models');
const { User } = db.sequelize.models;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

// regex de vérification des inputs du formulaire 

const nameRegex = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%&*(){}|~<>;:[\]]{2,}$/;
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

// signature par token jwt pour l'authentification user 
const newToken = user => {
    token = jwt.sign({ user_id: user.id, role: user.role, firstName: user.firstName, lastName: user.lastName, imageUrl: user.imageUrl }, SECRET_KEY, {
        expiresIn: '24h'
    })
    return { user, token }
}

// création user dans la base de données 
exports.signup = async (req, res) => {

    // mettre les valeurs du formulaire de la requete dans des variables
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstName;


    // conditions de création du user 
    try {
        console.log(req.body);
        // tests par regex et envoie de messages d'erreurs en cas d'échecs
        if (!nameRegex.test(firstName)) throw new Error('Invalid name');
        if (!nameRegex.test(lastName)) throw new Error('Invalid name');
        if (!emailRegex.test(email)) throw new Error('Invalid email');
        if (!passwordRegex.test(password)) throw new Error('Invalid password');

        // vérification que le user n'existe pas 
        const userFound = await User.findOne({
            attributes: ['email'],
            where: { email: email }
        })

        // envoie d'une erreur si le user existe déja 
        if (userFound) throw new Error('Email déja utilisée !');

        // hash du mot de passe avec bcrypt 
        const bcryptedPassword = await bcrypt.hash(password, 5)

        // enregistrer le user dans la base de donnée
        const newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: bcryptedPassword,

        });

        // envoie de message d'erreur en cas de problèmes durant la création 
        if (!newUser) throw new Error("la création de l'utilisateur à échouée !");


        // création du user et son id 
        return res.status(201).json({
            'uuid': newUser.uuid,
        })
    }
    catch (err) {
        console.error(err);
        return res.status(400).json(err.message)
    }
};

// connection du user 
exports.login = async (req, res, next) => {

    const email = req.body.email;

    // conditions de connection 
    try {
        // retrouver le user via son email 
        const user = await User.findOne({ where: { email } })

        // message d'erreur si l'email n'existe pas dans la base de données
        if (!user) throw new Error("User not found !")

        // comparaison des hashs de mots de passe avec bcrypt
        const ValidPassword = await bcrypt.compare(req.body.password, user.password)
        if (!ValidPassword) throw new Error("Wrong Password")

        // format du user et création d'un token d'authentification 
        const { createdAt, updatedAt, password, ...response } = user.dataValues
        return res.status(200).json(newToken(response))


    } catch (err) {
        console.error(err);
        res.status(401).json(err.message)
    }
};

// retrouver un user via son uuid 
exports.getOneUser = async (req, res, next) => {
    const uuid = req.params.uuid
    try {
        const user = await User.findOne({ where: { uuid } })
        const { createdAt, updatedAt, password, id, ...response } = user.dataValues
        return res.status(200).json(response)
    }
    catch (err) {
        console.error(err);
        return res.status(404).json(err.message)
    }
};



// trouver tout les users pour les admins
exports.getAllUsers = async (req, res, next) => {
    // conditions
    try {
        // trouver tout les models users de la base de données et les mettre en format json
        const users = await User.findAll({ include: 'posts' })

        // récuperer les users
        return res.status(200).json(users)

    } catch (err) {
        console.log(err)
        return res.status(500).json(err.message)
    }
};



// modification d'un user 
exports.modifyUser = async (req, res, next) => {
    // récuperation de l'uuid du user
    const uuid = req.params.uuid

    // recupération du body de la requete 
    const { firstName, lastName, password, email, imageUrl, biography } = req.body

    try {
        // vérifier si il y a un fichier  
        if (req.file) {
            imageUrl = `${req.protocol}://${req.get('host')}/public/${req.file.filename}`
        }

        // recuperer le modele avec le uuid 
        const user = await User.findOne({ where: { uuid } })
        console.log(user)

        //prendre en compte et sauvegarder les changements
        user.firstName = firstName
        user.lastName = lastName
        user.password = password
        user.imageUrl = imageUrl
        user.email = email
        user.biography = biography
        await user.save()

        return res.status(200).json({ message: 'user updated !' })

    } catch (err) {
        return res.status(404).json(err.message)
    }
};


// supprimé un user admin
exports.deleteUser = async (req, res, next) => {
    const uuid = req.params.uuid
    try {
        // trouver le user
        const user = await User.findOne({ where: { uuid } })

        // supprimé le user
        await user.destroy({ where: { uuid } })
        return res.status(200).json('User deleted !')

    } catch (err) {
        return res.status(500).json({ err })
    }
};

