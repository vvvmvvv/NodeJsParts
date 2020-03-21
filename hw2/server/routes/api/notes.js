const router = require('express').Router();
const verify = require('../middleware/verify');
const User = require('../../models/User');

router.get('/notes', verify, (req, res) => {
    res.send(req.user);
    User.findOne({_id: req.user});
    // res.json({
    //     notes:{
    //         title: "my note",
    //         description: "destrewqrqwx asdas"
    //     }
    // });
});

module.exports = router;