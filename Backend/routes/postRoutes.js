const express = require('express');
const { createPost } = require('../controllers/postControllers');

const router = express.Router()

router.route('/').post(createPost);

module.exports = router;