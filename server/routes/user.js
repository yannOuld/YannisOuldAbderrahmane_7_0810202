const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

router.get('/:uuid', auth, userCtrl.getOneUser);
router.get('/', auth, authAdmin, userCtrl.getAllUsers);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/edit/:uuid', auth, userCtrl.modifyUser);
router.delete('/:uuid', auth, authAdmin, userCtrl.deleteUser);

module.exports = router;