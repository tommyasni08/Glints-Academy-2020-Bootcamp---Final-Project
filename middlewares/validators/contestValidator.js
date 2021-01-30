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


const path = require('path');
module.exports = {
  contest: [
    check('id').custom((value, {
      req
    }) => {
      return contest.findOne({
        where: {
          id: req.params.id
        }
      }).then(result => {
        if (!result) {
          throw new Error('Contest Not Found!')
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

  close: [
    check('id_contest').custom((value, {
      req
    }) => {
      return contest.findOne({
        where: {
          id: req.params.id_contest,
          id_status_contest:1
        }
      }).then(result => {
        if (!result) {
          throw new Error('Contest Not Found or Already Closed!')
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
          throw new Error('You are not Authorized to Close this Contest!')
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

  create:[
    check('title',"Please Fill in the Title").not().isEmpty().custom((value,{req}) => {
      return contest.findOne({
        where: {
          title:req.body.title
        }
      }).then(result=>{
        if (result) {
          throw new Error("Title Already Used!")
        }
      })
    }),
    check('prize',"Numeric Only!").isNumeric(),
    check('due_date').isDate().toDate(),
    check('announcement').isDate().toDate(),
    check('description',"Please Fill in the Description").not().isEmpty(),
    (req, res, next) => {
      const errors = validationResult(req);
      if (req.body.announcement < req.body.due_date) {
        let announcement_errror = {
          value:req.body.announcement,
          msg: 'Announcement Date must be later than Due Date',
          param: 'announcement',
          location: 'body'
        }
        errors.errors.push(announcement_errror)
      }

      if (!errors.isEmpty()) {
        return res.status(422).json({
          errors: errors.mapped()
        })
      }
      next();
    }
  ],

  submit:[
    check('id_contest').custom((value, {
      req
    }) => {
      return contest.findOne({
        where: {
          id: req.params.id_contest,
          id_status_contest:1,
        }
      }).then(result => {
        if (!result) {
          throw new Error('Contest Not Found or Not Opened!')
        }
      })
    }),
    check('id_participant').custom((value, {
      req
    }) => {
      return user.findOne({
        where: {
          id: req.params.id_participant,
          id_role:3
        }
      }).then(result => {
        if (!result) {
          throw new Error('User Not Found or You are not Participant!')
        }
      })
    }).custom((value,{req})=>{
      return application.findOne({
        where: {
          id_contest:req.params.id_contest,
          id_participant:req.params.id_participant
        }
      }).then(result=>{
        if (result) {
          throw new Error("User Already Submit for This Contest!")
        }
      })
    }),
    check('description',"Please Fill in the Description").not().isEmpty(),
    (req, res, next) => {
      if (req.files.length === 0) {
        return res.status(422).json({
          errors:{"images":{"msg":"Please Upload Your Files"}}
        })
      }
      try {
        if (req.files.length > 0) {
          const filetypes = /pdf|jpeg|jpg|png|gif/;

          const fileType = req.files.map(x => path.extname(x.originalname).toLowerCase()),
                mimeType = req.files.map(x => x.mimetype),
                fileSize = req.files.map(x => x.size)

          const fileTypeVal = fileType.map(x => filetypes.test(x)).includes(false),
                mimeTypeVal = mimeType.map(x => filetypes.test(x)).includes(false),
                fileSizeVal = fileSize.map(x => x > 10000000).includes(true)

          if (fileTypeVal || mimeTypeVal) {
            return res.status(422).json({
              errors:{"images":{"msg":"Please Upload Image file Only"}}
            })
          } else if (fileSizeVal) {
            return res.status(422).json({
              errors:{"images":{"msg":"Please Upload Image file size < 10 MB"}}
            })
          }
        }
      }
      catch (e) {
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
  ],

  submission: [
    check('id_contest').custom((value, {
      req
    }) => {
      return contest.findOne({
        where: {
          id: req.params.id_contest,
        }
      }).then(result => {
        if (!result) {
          throw new Error('Contest Not Found')
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

  winner: [
    check('id_submission').custom((value, {
      req
    }) => {
      return application.findOne({
        where: {
          id: req.params.id_submission,
          id_status_contest:2
        }
      }).then(result => {
        if (!result) {
          throw new Error('Submission Not Found or Contest Not Closed!')
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
      return application.findOne({
        where: {
          id: req.params.id_submission,
          id_provider:req.params.id_provider
        }
      }).then(result => {
        if (!result) {
          throw new Error('You are not Authorized to Pick the Winner')
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

}
