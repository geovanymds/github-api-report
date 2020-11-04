//Postgres
const user = require('../services/getGitUsers');
const repos = require('../services/getGitRepos');
const licenses = require('../services/getGitLicenses');
const issues = require('../services/getGitIssues');

//Mongo
const userMongo = require('../services/mongodb/getGitUsers');
const reposMongo = require('../services/mongodb/getGitRepos');
const licensesMongo = require('../services/mongodb/getGitLicenses');
const issuesMongo = require('../services/mongodb/getGitIssues');

const router = require('express').Router();

//Rotas Postgres
router.post('/getGitUsers' , user.getGitUsers);
router.post('/getGitRepos' , repos.getGitRepos);
router.post('/getGitSubscriptions' , repos.getGitSubscriptions);
router.post('/getGitIssues' , issues.getGitIssues);
router.post('/getGitLicenses' , licenses.getGitLicenses);

//Rotas Mongo
router.post('/mongo/getGitUsers' , userMongo.getGitUsers);
router.post('/mongo/getGitRepos' , reposMongo.getGitRepos);
router.post('/mongo/getGitSubscriptions' , reposMongo.getGitSubscriptions);
router.post('/mongo/getGitIssues' , issuesMongo.getGitIssues);
router.post('/mongo/getGitLicenses' , licensesMongo.getGitLicenses);


module.exports = router;