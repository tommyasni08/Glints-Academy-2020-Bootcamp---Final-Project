const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const paymentController = require('../controllers/paymentController');
const paymentValidator = require('../middlewares/validators/paymentValidator');
const upload = require('../middlewares/validators/uploadImage');
const MailController = require('../controllers/mailController');

router.post('/provider/:id_contest/:id_provider', [upload.provider, paymentValidator.provider, function(req,res,next){
    passport.authenticate('provider',{
        session:false
    }, async function (err,user, info){
        if(!user){
            res.status(401).json({
            status:'Error',
            message:info.message
            })
            return;
        }
        paymentController.provider(user,req,res);
        MailController.provider(user,req,res);
    })(req,res,next)
}])

router.get('/:id_contest/', [paymentValidator.payment, function(req,res,next){
    passport.authenticate('admin',{
        session:false
    }, async function (err,user, info){
        if(!user){
            res.status(401).json({
            status:'Error',
            message:info.message
            })
            return;
        }
        paymentController.payment(user,req,res);
    })(req,res,next)
}])

router.get('/approve/:id_contest/', [paymentValidator.payment, function(req,res,next){
    passport.authenticate('admin',{
        session:false
    }, async function (err,user, info){
        if(!user){
            res.status(401).json({
            status:'Error',
            message:info.message
            })
            return;
        }
        paymentController.approve(user,req,res);
        MailController.approve(user,req,res)
    })(req,res,next)
}])

router.get('/reject/:id_contest/', [paymentValidator.payment, function(req,res,next){
    passport.authenticate('admin',{
        session:false
    }, async function (err,user, info){
        if(!user){
            res.status(401).json({
            status:'Error',
            message:info.message
            })
            return;
        }
        paymentController.reject(user,req,res);
        MailController.reject(user,req,res)
    })(req,res,next)
}])

router.post('/admin/:id_contest/:id_winner', [upload.admin, paymentValidator.admin, function(req,res,next){
    passport.authenticate('admin',{
        session:false
    }, async function (err,user, info){
        if(!user){
            res.status(401).json({
            status:'Error',
            message:info.message
            })
            return;
        }
        paymentController.admin(user,req,res);
        MailController.admin(user,req,res)
    })(req,res,next)
}])

module.exports =router;