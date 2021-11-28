const express = require('express');
const { registerUser, authUser, saveResponse } = require('../controllers/userControllers');

const router = express.Router()

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/save_response').post(saveResponse);

module.exports = router;