const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route GET api/users
// @desc get all Users
router.get("/", (req, res) => {
  User.find({}).then(users => {
    res.json(users)
    console.log(users)
  })
})

router.post("/add-report", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    console.log(user)
    const report = {
      additionalHealthInformation: 'String',
      contaminantInformation: 'String',
      howToReachOut: 'String',
      sourceWaterAssessment: 'String',
      qualityTable: [{
        inorganicContaminants: [{
          barium: [{
            datesOfSampling: 'String',
            mclViolation: true,
            levelDetected: 1,
            rangeOfResults: 'String',
            mclg: 'String',
            mcl: 'String',
            likelySourceOfContamination: 'String'
          }],
          flouride: [{
            datesOfSampling: 'String',
            mclViolation: true,
            levelDetected: 1,
            rangeOfResults: 'String',
            mclg: 'String',
            mcl: 'String',
            likelySourceOfContamination: 'String'
          }],
          nitrate: [{
            datesOfSampling: 'String',
            mclViolation: true,
            levelDetected: 1,
            rangeOfResults: 'String',
            mclg: 'String',
            mcl: 'String',
            likelySourceOfContamination: 'String'
          }],
          sodium: [{
            datesOfSampling: 'String',
            mclViolation: true,
            levelDetected: 1,
            rangeOfResults: 'String',
            mclg: 'String',
            mcl: 'String',
            likelySourceOfContamination: 'String'
          }],
        }],
        disinfectantsAndDisinfectionByProducts: [{
          chlorineAndChloramines: [{
            datesOfSampling: 'String',
            mclOrMrdlViolation: true,
            levelDetected: 1,
            rangeOfResults: 'String',
            mclgOrMrdlg: 'String',
            mclOrMrdl: 'String',
            likelySourceOfContamination: 'String'
          }],
          haloaceticAcids: [{
            chlorineAndChloramines: [{
              datesOfSampling: 'String',
              mclOrMrdlViolation: true,
              levelDetected: 1,
              rangeOfResults: 'String',
              mclgOrMrdlg: 'String',
              mclOrMrdl: 'String',
              likelySourceOfContamination: 'String'
            }],
          tthm: [{
            chlorineAndChloramines: [{
              datesOfSampling: 'String',
              mclOrMrdlViolation: true,
              levelDetected: 1,
              rangeOfResults: 'String',
              mclgOrMrdlg: 'String',
              mclOrMrdl: 'String',
              likelySourceOfContamination: 'String'
            }],
          }]
        }]
      }],
        leadAndCopper: [{
          copper: [{
            datesOfSampling: 'String',
            alExceeded: true,
            ninetiethPercentileResult: 1,
            exceedingTheAl: 1,
            mclg: 1,
            al: 1,
            likelySourceOfContamination: 'String'
          }],
          lead: [{
            datesOfSampling: 'String',
            alExceeded: true,
            ninetiethPercentileResult: 1,
            exceedingTheAl: 1,
            mclg: 1,
            al: 1,
            likelySourceOfContamination: 'String'
          }]
        }]
      }]
    }

    user.reports.push(report)
    console.log(user)
    user.save(function (err){
      if(err) throw new Error('report did not save')
    })
    return res.json(user)
  })
})

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
