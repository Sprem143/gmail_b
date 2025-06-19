const express = require('express');
const router = express.Router();
const {saveSender,getSenders, deletesenderemail, editsenderemail} = require('../controllers/sender');
const {sendEmails} = require('../controllers/receiver')

router.post('/savesender', saveSender);
router.get('/getsender', getSenders);
router.post('/sendemails', sendEmails);
router.post('/deletesenderemail', deletesenderemail);
router.post('/editsenderemail', editsenderemail);

module.exports = router;
