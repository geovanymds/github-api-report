const router = require('express').Router();
const repoController = require('../controllers/repository');

router.get('/main', repoController.main);

module.exports = router;