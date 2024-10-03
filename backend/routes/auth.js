const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchUser');


const JWT_SECRET = 'darshilisagoodboy';


//ROUTE 1 :create a user using : POST "/api/auth/login" , dose not require login.
router.post('/createuser', [
  body('name', 'Enter a valid Name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'enter password atleast 5 character').isLength({ min: 5 }),
],
  async (req, res) => {
    let success = false;
    //if there are error return the bad request and the error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    //check whether the user with the same email is exists already.
    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({success, error: "Sorry a user with the same email is exists already." })
      }

      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
      });

      const data = {
        user: {id : user.id}
      }

      const authtoken = jwt.sign(data, JWT_SECRET);
      // res.json(user)
      success = true;
      res.json({success, authtoken })

    } catch (error) {
      console.log(error.message);
        res.status(500).send(success,"Internal server error.");
    }

  })

//ROUTE 2 :Authenticate a user using : POST "/api/auth/login" , dose not require login.

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password can not be blank').exists(),
],
  async (req, res) => {
    let success = false;
        //if there are error return the bad request and the error.
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({success, errors: errors.array() });
        }

        const {email , password} = req.body;

        try {
          let user =await User.findOne({email});
          if (!user) {
            success = false;
              return res.status(400).json({success, error : "Please try to login with correct credentials"});
          }
          const passwordCompare =await bcrypt.compare(password, user.password);
          if (!passwordCompare) {
            success = false;
            return res.status(400).json({success, error : "Please try to login with correct credentials"});
        }
      
        const data = {
          user: user.id,
        }
  
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

        }  catch (error) {
      console.log(error.message);
        res.status(500).send("Internal server error.");
    }

  })

  //ROUTE 3 :Get login user detail using : POST "/api/auth/getuser" ,require login.
  router.post('/getuser', fetchuser ,async (req, res) => {
try {
  const userId = req.user.id;
  const user = await User.findById(userId).select('-password')
  res.send(user)
  
} catch (error) {
  console.log(error.message);
    res.status(500).send("Internal server error.");
  
}
})

module.exports = router