const router = require('express').Router();
const repoController = require('../controllers/repository');

router.get('/languages', repoController.getLanguages);

module.exports = router;