const express = require('express');
const router = express.Router();
const {saveSender,getSenders, deletesenderemail, editsenderemail} = require('../controllers/sender');
const { signin, signup, dashboard} = require('../controllers/auth')
const {sendEmails} = require('../controllers/receiver')

router.post('/savesender', saveSender);
router.get('/getsender', getSenders);
router.post('/sendemails', sendEmails);
router.post('/deletesenderemail', deletesenderemail);
router.post('/editsenderemail', editsenderemail);
router.post('/api/signin', signin)
router.post('/api/signup', signup)
router.post('/verify-token', dashboard)

module.exports = router;
