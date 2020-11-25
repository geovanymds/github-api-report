const router = require('express').Router();
const repoController = require('../controllers/repository');

router.get('/main', repoController.main);
router.get('/report', repoController.report);

module.exports = router;