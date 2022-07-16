const db = require('../models')
const { Comment } = db.sequelize.models
const AsyncHandler = require('express-async-handler');

// crée un commentaire
exports.createComment = AsyncHandler(async (req, res, next) => {
    const { content, owner_id } = req.body
    const post_uuid = req.params.uuid

    // conditions ou message d'erreur en cas de problèmes
    if (owner_id !== req.reqdata.user_id) throw new Error('Wrong user')

    // creation du commentaire avec le model sequelize, le body de la requete , les id  user et post
    try {
        let comment = await Comment.create({
            content,
            post_uuid,
            owner_id
        }).catch((err) => {
            throw new Error('le commentaire n\'a pas pu etre crée')
        })

        return res.status(201).json(comment)

    } catch (err) {

        res.status(400).json(err.message)
    }
});

// trouver tout les commentaires 
exports.getAllComment = async (req, res, next) => {
    const post_uuid = req.params.uuid

    // parametrages de recherche
    const options = {
        where: { post_uuid },
        include: ['owner'],
        order: [['createdAt', 'ASC']],
    }

    // retrouver tout les commmentaires d'un post avec les options en parametres 
    try {
        const comments = await Comment.findAndCountAll(options)

        if (!comments) throw new Error('Les commentaires n\'ont pas être trouvés !')

        return res.status(200).json(comments)

    } catch (err) {
        return res.status(400).json(err.message)
    }
}

// supprimer un commentaire
exports.deleteComment = async (req, res, next) => {
    const id = req.params.id

    try {
        const comment = await Comment.findOne({ where: { id } })

        if (!comment) throw new Error('I have the high ground Anakin !')

        await comment.destroy()

        return res.status(200).json('comment deleted !')

    } catch (err) {
        return res.status(400).json(err.message)
    }

}