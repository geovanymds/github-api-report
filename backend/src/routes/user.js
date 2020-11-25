const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/report', userController.report);

module.exports = router;