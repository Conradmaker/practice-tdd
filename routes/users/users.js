const express = require('express');
const { welcome } = require('../../controller/user/user');

const router = express.Router();

router.get('/', welcome);

module.exports = router;
