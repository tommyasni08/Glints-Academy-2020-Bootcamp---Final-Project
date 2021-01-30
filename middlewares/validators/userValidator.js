const {
  check,
  validationResult,
  matchedData,
  sanitize} = require('express-validator');
const {
  user,
  status,
  role,
  payment,
  contest,
  application} = require('../../models')

const Op = require('sequelize').Op;
const path = require('path');

function isEmptyOrSpaces(str) {
  return str === null || str.match(/^ *$/) !== null;
}

function isNumber(num) {
  return /^\d+$/.test(num);
}

module.exports = {
  register: [
    check('fullname','Alphabet Only').isLength({
      min: 3,
      max: 50
    }).not().isEmpty()
    // .custom(value => {
    //   if (isEmptyOrSpaces(value)) {
    //     throw new Error('Full Name Must not be Empty or Spaces')
    //   };
      // if (value.split(" ").length < 2) {
      //   return user.findOne({
      //     where: {
      //       firstname: value
      //     }
      //   }).then(result => {
      //     if (result) {
      //       throw new Error('Full Name Already Used')
      //     }
      //   })
      // } else {
      //   return user.findOne({
      //     where: {
      //       fullname: value
      //     }
      //   }).then(result => {
      //     if (result) {
      //       throw new Error('Full Name Already Used')
      //     }
      //   })
      // }
    // })
    ,
    check('email', 'Email Field Must be Email Address').normalizeEmail().isEmail().custom(value => {
      return user.findOne({
        where: {
          email: value
        }
      }).then(result => {
        if (result) {
          throw new Error('Email Already Used!')
        }
      })
    }),
    check('password', 'Password Field Must Have 8 to 32 Characters').isString().isLength({
      min: 8,
      max: 32
    }),
    check('passwordConfirmation', 'PasswordConfirmation Field Must Have the Same Value as the Password Field').exists()
    .custom((value, {
      req
    }) => value === req.body.password),
    check('role').isNumeric(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    }
  ],

  login: [
    check('email', 'Email Field Must be Email Address').normalizeEmail().isEmail().custom(value => {
      return user.findOne({
        where: {
          email: value
        }
      }).then(result => {
        if (!result) {
          throw new Error("Email Doesn't Exist")
        }
      })
    }),
    check('password', 'Password Field Must Have 8 to 32 Characters').isString().isLength({
      min: 8,
      max: 32
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        });
      }
      next();
    }
  ],

  profile: [
    check('id').custom((value, {
      req
    }) => {
      return user.findOne({
        where: {
          id: req.params.id
        }
      }).then(result => {
        if (!result) {
          throw new Error('User Not Found!')
        }
      })
    }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ],

  update: [
    check('firstname').isString()
    // .custom((value,{req})=>{
    //   const fullname = `${req.body.firstname} ${req.body.lastname}`
    //   return user.findOne({
    //     where:{
    //       fullname: fullname,
    //       id: {[Op.ne]: req.params.id_user}
    //     }
    //   }).then(result=>{
    //     if (result) {
    //       throw new Error('Fullname already exist, kindly change either firstname or lastname')
    //     }
    //   })
    // })
    ,
    check('lastname').isString(),
    check('location','Enter Your Domicile or City').isString(),
    async (req, res, next) => {
      try {
        const checkAccNum = await user.findOne({
          where:{
            account_number: req.body.account_number,
            id: {[Op.ne]: req.params.id_user}
          }
        })
        if (req.body.account_number) {
          if (!isNumber(req.body.account_number)) {
            return res.status(422).json({
              errors:{"account_number":{"msg":"Please Input Number Only!"}}
            })
          } else if (req.body.account_number.length < 6 || req.body.account_number.length > 17) {
            return res.status(422).json({
              errors:{"account_number":{"msg":"Please Input 6 - 17 Digits"}}
            })
          } else if (checkAccNum){
            return res.status(422).json({
              errors:{"account_number":{"msg":"Account Number Already Used!"}}
            })
          }
        }
        if (req.file) {
          const filetypes = /pdf|jpeg|jpg|png|gif/;
          const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
          const mimetype = filetypes.test(req.file.mimetype);
          if (req.file.size > 10000000) {
            return res.status(422).json({
              errors:{"picture":{"msg":"Please Upload Image file size < 10 MB"}}
            })
          } else if (!mimetype || !extname) {
            return res.status(422).json({
              errors:{"picture":{"msg":"Please Image file Only"}}
            })
          }
        }
      } catch (e) {
        return res.status(422).json({
          errors:e
        })
      }

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ]

};
