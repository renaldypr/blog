const router = require('express').Router();
const { showAll, create, erase, edit } = require('../controllers/articleController');
const { auth } = require('../middlewares/auth');

router.get('/', showAll);
router.post('/', auth, create);
router.delete('/', auth, erase);
router.patch('/', auth, edit);

module.exports = router;