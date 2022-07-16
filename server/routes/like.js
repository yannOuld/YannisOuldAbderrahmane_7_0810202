const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like.js');
const auth = require('../middleware/auth');


router.post('/:uuid/likes', auth, likeCtrl.addLike)
router.get('/:uuid/likes', auth, likeCtrl.getLikes)


module.exports = router;