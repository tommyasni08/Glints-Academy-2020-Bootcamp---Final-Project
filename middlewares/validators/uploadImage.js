const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

const uploadDir = '/img/';
const storageUser = multer.diskStorage({
  destination: "./public" + uploadDir,
  filename: function(req, file, cb) {
    cb(null,"user_"+ req.params.id_user + "_picture" + path.extname(file.originalname))
  }
})

const uploadSingle = multer({
  storage: storageUser,
  dest: uploadDir,
})

const storageSubmission = multer.diskStorage({
  destination: "./public" + uploadDir,
  filename: function(req, file, cb) {
    cb(null,"contest_"+ req.params.id_contest + "_participant_" + req.params.id_participant + "_submission_" + file.originalname)
  }
})

const uploadMultiple = multer({
  storage: storageSubmission,
  dest: uploadDir
});


const storageProvider = multer.diskStorage({
  destination: "./public" + uploadDir,
  filename: function(req, file, cb) {
    cb(null,"contest_"+ req.params.id_contest + "_provider_" + req.params.id_provider + "_payment_evidence_"+ file.originalname)
  }
})

const uploadProvider = multer({
  storage: storageProvider,
  dest: uploadDir
});

const storageAdmin = multer.diskStorage({
  destination: "./public" + uploadDir,
  filename: function(req, file, cb) {
    cb(null,"contest_"+ req.params.id_contest + "_winner_" + req.params.id_winner + "_payment_evidence_"+ file.originalname)
  }
})

const uploadAdmin = multer({
  storage: storageAdmin,
  dest: uploadDir
});

module.exports = {
  single: [
    uploadSingle.single('picture')
  ],

  multiple: [
    uploadMultiple.array('image', 5)
  ],
  
  provider: [
    uploadProvider.single('evidence')
  ],

  admin: [
    uploadAdmin.single('evidence')
  ]
}
