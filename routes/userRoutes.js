const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const UserController = require('../controllers/userController');
const userValidator = require('../middlewares/validators/userValidator');
const upload = require('../middlewares/validators/uploadImage');

router.post('/register', [userValidator.register, function(req, res, next) {
  passport.authenticate('register', {
    session: false
  }, function(err, user, info) {
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
    UserController.register(user, req, res,next);
  })(req, res, next);
}]);

router.post('/login', [userValidator.login, function(req, res, next) {
  passport.authenticate('login', {
    session: false
  }, function(err, user, info) {
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
    UserController.login(user, req, res,next);
  })(req, res, next);
}]);

// router.get('/profile/:id', [userValidator.profile, function(req, res, next) {
router.get('/profile', [function(req, res, next) {
  passport.authenticate('user', {
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
    UserController.profile(user, req, res,next);
  })(req, res, next);
}]);

router.patch('/profile/password', UserController.password)

router.patch('/profile/update/:id_user', [upload.single, userValidator.update, function(req,res,next) {
  passport.authenticate('user', {
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
    UserController.update(user, req, res,next);
  })(req, res, next);
}])



module.exports = router;
