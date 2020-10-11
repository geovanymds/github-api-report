const user = require('../services/getGitUsers');
const repos = require('../services/getGitRepos');
const licenses = require('../services/getGitLicenses');
const router = require('express').Router();

router.get('/getGitUsers' , user.getGitUsers);
router.get('/getGitRepos' , repos.getGitRepos);
router.get('/getGitSubscriptions' , repos.getGitSubscriptions);
router.get('/getGitLicenses' , licenses.getGitLicenses);

module.exports = router;