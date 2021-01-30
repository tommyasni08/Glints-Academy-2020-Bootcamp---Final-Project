const {
    check,
    validationResult,
    matchedData,
    sanitize
} = require('express-validator');
const {
    user,
    status,
    role,
    payment,
    contest,
    application
} = require('../../models')
const Op = require('sequelize').Op;
const path = require('path');

// function isNumber(num) {
//     return /^\d+$/.test(num);
// }

module.exports = {
provider: [
    check('id_contest').custom((value, {
        req
    }) => {
        return contest.findOne({
            where: {
                id: req.params.id_contest,
                // id_status_contest:1,
            }
        }).then(result => {
            if (!result) {
                throw new Error('Contest Not Found!')
            }
        })
    })
    .custom((value, {req}) => {
        return payment.findOne({
            where:{
                id_contest:req.params.id_contest,
                id_provider:req.params.id_provider
            }
        }).then(result => {
            if (result) {
                throw new Error('Payment Already Done, Please Wait until the Update from Admin!')
            }
        })
    }),
    check('id_provider').custom((value, {
        req
      }) => {
        return user.findOne({
          where: {
            id: req.params.id_provider,
          }
        }).then(result => {
          if (!result) {
            throw new Error('User Not Found!')
          }
        })
      }).custom((value, {
        req
      }) => {
        return contest.findOne({
          where: {
            id: req.params.id_contest,
            id_provider:req.params.id_provider
          }
        }).then(result => {
          if (!result) {
            throw new Error('You are not the Provider for this Contest!')
          }
        })
      }),
    check('bank_provider').not().isEmpty(),
    check('account_number_provider','6 to 17 Digits Number Only!').isNumeric().isLength({ min:6, max:17}),
    async (req, res, next) => {
        // try {
            // const checkAccNum = await user.findOne({
            //     where: {
            //         account_number: req.body.account_number,
            //         id: {
            //             [Op.ne]: req.params.id_payment
            //         }
            //     }
            // })
            // if (req.body.account_number) {
            //     if (!isNumber(req.body.account_number)) {
            //         return res.status(422).json({
            //             errors: {
            //                 "account_number": {
            //                     "msg": "Please Input Number Only!"
            //                 }
            //             }
            //         })
            //     } else if (req.body.account_number.length < 6 || req.body.account_number.length > 17) {
            //         return res.status(422).json({
            //             errors: {
            //                 "account_number": {
            //                     "msg": "Please Input 6 - 17 Digits"
            //                 }
            //             }
            //         })
            //     }//else if (checkAccNum){
            //         // return res.status(422).json({
            //             // errors:{"account_number":{"msg":"Account Number Already Used!"}}
            //         //})
            //         // }
            // }
            if (req.file) {
                const filetypes = /pdf|jpeg|jpg|png|gif/;
                const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
                const mimetype = filetypes.test(req.file.mimetype);
                if (req.file.size > 10000000) {
                    return res.status(422).json({
                        errors: {
                            "evidence": {
                                "msg": "Please Upload Image file size < 10 MB"
                            }
                        }
                    })
                } else if (!mimetype || !extname) {
                    return res.status(422).json({
                        errors: {
                            "evidence": {
                                "msg": "Please Image file Only"
                            }
                        }
                    })
                }
            } else {
                return res.status(422).json({
                    errors: {
                        "evidence": {
                            "msg": "Please Upload Your Payment Evidence"
                        }
                    }
                })
            }
        // } catch (e) {
        //     return res.status(422).json({
        //         errors: e
        //     })
        // }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.mapped()
            })
        }
        next();
    }

],

payment: [
    check('id_contest').custom((value, {req})=> {
        return contest.findOne({
            where:{
                id:req.params.id_contest
            }
        }).then(result=>{
            if (!result) {
                throw new Error('Contest not Found!')
            }
        })
    }).custom((value, {req})=>{
        return payment.findOne({
            where:{
                id_contest:req.params.id_contest
            }
        }).then(result=>{
            if (!result) {
                throw new Error("Payment haven't been made by provider!")
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

admin: [
    check('id_contest').custom((value, {
        req
    }) => {
        return contest.findOne({
            where: {
                id: req.params.id_contest,
                // id_status_contest:1,
            }
        }).then(result => {
            if (!result) {
                throw new Error('Contest Not Found!')
            }
        })
    }).custom((value,{req})=> {
        return payment.findOne({
            where:{
                id_contest:req.params.id_contest,
                // evidence_winner: {
                //     [Op.not]: null
                // }
            }
        }).then(result=>{
            if(result && result.evidence_winner.slice(5) === null) {
                throw new Error('Admin Already Submit the payment to the winner')
            }
        })
    }),
    check('id_winner').custom((value, {
        req
      }) => {
        return user.findOne({
          where: {
            id: req.params.id_winner,
          }
        }).then(result => {
          if (!result) {
            throw new Error('User Not Found!')
          }
        })
      }),
    async (req, res, next) => {
        if (req.file) {
            const filetypes = /pdf|jpeg|jpg|png|gif/;
            const extname = filetypes.test(path.extname(req.file.originalname).toLowerCase());
            const mimetype = filetypes.test(req.file.mimetype);
        if (req.file.size > 10000000) {
            return res.status(422).json({
                errors: {
                    "evidence": {
                        "msg": "Please Upload Image file size < 10 MB"
                    }
                }
            })
        } else if (!mimetype || !extname) {
            return res.status(422).json({
                errors: {
                    "evidence": {
                        "msg": "Please Image file Only"
                    }
                }
            })
        }
        } else {
            return res.status(422).json({
                errors: {
                    "evidence": {
                        "msg": "Please Upload Your Payment Evidence"
                    }
                }
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
],

}
