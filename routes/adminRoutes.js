const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const AdminController = require('../controllers/adminController');
// const adminValidator = require('../middlewares/validators/adminValidator');
const paymentValidator = require('../middlewares/validators/paymentValidator');

router.get('/dashboard',[function(req, res, next) {
    passport.authenticate('admin', {
      session: false
    }, async function(err, user, info) {
      // if (err) {
      //   return next(err);
      // }
      if (!user) {
        res.status(401).json({
          status: 'Error',
          message: info.message
        });
        return;
      }
      AdminController.dashboard(user, req, res);
    })(req, res, next);
    
}]);

router.get('/dashboard/paid',[function(req, res, next) {
    passport.authenticate('admin', {
      session: false
    }, async function(err, user, info) {
      // if (err) {
      //   return next(err);
      // }
      if (!user) {
        res.status(401).json({
          status: 'Error',
          message: info.message
        });
        return;
      }
      AdminController.paid(user, req, res);
    })(req, res, next);
    
}]);

router.get('/dashboard/unpaid',[function(req, res, next) {
    passport.authenticate('admin', {
      session: false
    }, async function(err, user, info) {
      // if (err) {
      //   return next(err);
      // }
      if (!user) {
        res.status(401).json({
          status: 'Error',
          message: info.message
        });
        return;
      }
      AdminController.unpaid(user, req, res);
    })(req, res, next);
    
}]);

router.get('/dashboard/:id_contest',[paymentValidator.payment,function(req, res, next) {
  passport.authenticate('all', {
    session: false
  }, async function(err, user, info) {
    // if (err) {
    //   return next(err);
    // }
    if (!user) {
      res.status(401).json({
        status: 'Error',
        message: info.message
      });
      return;
    }
    AdminController.contestWinner(user, req, res);
  })(req, res, next);
  
}]);

module.exports = router;