const router = require('express').Router();
const User = require('../../models/User');

router.post('/register', async (req, res) => {

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send("Email is already exist");

    //hash pass

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        res.send(savedUser);
    }catch(err){
        res.status(400).send(err);
    }
});

router.get('/register', (req, res) => {
 res.send("REGISTER");
});

module.exports = router;