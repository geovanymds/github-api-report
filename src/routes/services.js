const user = require('../services/getGitUsers');
const router = require('express').Router();

router.get('/getGitUsers' , user.getGitUsers);

module.exports = router;