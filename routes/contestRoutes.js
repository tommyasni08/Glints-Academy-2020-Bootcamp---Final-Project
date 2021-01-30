const express = require('express');
const passport = require('passport');
const router = express.Router();
const auth = require('../middlewares/auth');
const ContestController = require('../controllers/contestController');
const contestValidator = require('../middlewares/validators/contestValidator');
const upload = require('../middlewares/validators/uploadImage');
const MailController = require('../controllers/mailController');
const contestController = require('../controllers/contestController');

router.post('/search/category',[function(req, res, next) {
  passport.authenticate('participant', {
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
    ContestController.searchCat(user, req, res);
  })(req, res, next);
}]);

// router.post('/search/status',[function(req, res, next) {
//   passport.authenticate('user', {
//     session: false
//   }, async function(err, user, info) {
//     // if (err) {
//     //   return next(err);
//     // }
//     if (!user) {
//       res.status(401).json({
//         status: 'Error',
//         message: info.message
//       });
//       return;
//     }
//     ContestController.searchStat(user, req, res);
//   })(req, res, next);
// }]);

router.post('/mycontest',[function(req, res, next) {
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
    ContestController.myContest(user, req, res);
  })(req, res, next);
}]);

router.post('/getAllContest', ContestController.getAllContest)

router.get('/winContest',[function(req, res, next) {
  passport.authenticate('participant', {
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
    ContestController.win(user, req, res);
  })(req, res, next);
}]);

router.get('/:id',[contestValidator.contest,function(req, res, next) {
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
    ContestController.contest(user, req, res);
  })(req, res, next);
}]);

router.post('/submit/:id_contest/:id_participant', [upload.multiple, contestValidator.submit, function(req, res, next){
  passport.authenticate('participant',{
    session:false
  }, async function(err, user, info){
    if(!user){
      res.status(401).json({
        status:'Error',
        message:info.message
      });
      return;
    }
    ContestController.submit(user, req, res);
    MailController.submit(user,req,res)
  })(req, res, next);
}])

router.get('/submission/:id_contest', [contestValidator.submission, function(req, res, next){
  passport.authenticate('user',{
    session:false
  }, async function(err, user, info){
    if(!user){
      res.status(401).json({
        status:'Error',
        message:info.message
      });
      return;
    }
    ContestController.submission(user, req, res);
  })(req, res, next);
}]);

router.post('/create',[contestValidator.create, function(req, res, next) {
  passport.authenticate('provider', {
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
    ContestController.create(user, req, res);
    MailController.create(user,req,res);
  })(req, res, next);
}]);

router.get('/update/close/:id_contest/:id_provider', [contestValidator.close, function(req, res, next){
  passport.authenticate('provider',{
    session:false
  }, async function(err, user, info){
    if(!user){
      res.status(401).json({
        status:'Error',
        message:info.message
      });
      return;
    }
    ContestController.close(user, req, res);
  })(req, res, next);
}]);

router.get('/update/winner/:id_provider/:id_submission', [contestValidator.winner, function(req, res, next){
  passport.authenticate('provider',{
    session:false
  }, async function(err, user, info){
    if(!user){
      res.status(401).json({
        status:'Error',
        message:info.message
      });
      return;
    }
    ContestController.submissionWinner(user, req, res);
    MailController.winner(user,req,res);
  })(req, res, next);
}]);

router.get('/winner/:id_contest',[contestValidator.submission,function(req, res, next) {
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
    ContestController.winner(user, req, res);
  })(req, res, next);
}]);



module.exports = router;
