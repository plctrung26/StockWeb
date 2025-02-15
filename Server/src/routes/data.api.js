const express = require('express');
const router = express.Router();
const { addDataBase, showDatabase } = require('../controllers/databaseController');

router.post('/send-data', addDataBase);
router.get('/get-data', showDatabase);


module.exports = router;
