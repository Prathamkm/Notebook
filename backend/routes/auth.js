const express = require('express');
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
// const { response } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'Prathamisagoodb&oy';

router.post('/createuser',[
body('name','Enter a valid name').isLength({min:3}),
body('email','Enter a valid email').isEmail(),
body('password','Password must be atleast 5 charachters').isLength({min: 5}),],
 async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    try{
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({error:"sorry a user with this email is alredy exists"})
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password,salt);

    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
    });
    const data ={
        id: user.id
    }
    const authtoken = jwt.sign(data,JWT_SECRET);
    // .then(user => res.json(user))
    //   .catch(err => {console.log(err)
    // res.json({error: 'please enter a unique value for email',message: err.message})})
    res.json({authtoken});
} catch(error){
    console.error(error.message);
    res.status(500).send("some error occured")
}
})

module.exports = router