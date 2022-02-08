const { Router } = require('express');
const { check } = require('express-validator');
const { json } = require('express/lib/response');

const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: "get"
    })
});

module.exports = router;