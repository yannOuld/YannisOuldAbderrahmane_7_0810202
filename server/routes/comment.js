const express = require('express');
const router = express.Router();
const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');


router.post('/:uuid/comments', auth, commentCtrl.createComment)
router.get('/:uuid/comments/', auth, commentCtrl.getAllComment)
router.delete('/:uuid/comments/:id', auth, commentCtrl.deleteComment)

module.exports = router;