const {
  user,
  status,
  role,
  payment,
  contest,
  application
} = require('./models');
const nodemailer = require('nodemailer');
const cron = require('node-cron')
const MailController = require('./controllers/mailController')

async function rProviderPay() {
  const today = new Date()
  const unpaidContest = await contest.findAll({
    where:{
      id_status_contest:3
    }
  })

  if (unpaidContest.length == 0) {
    return
  }

  for(let i=0;i<unpaidContest.length;i++) {
    if ((today - unpaidContest[i].dataValues.createdAt)/1000/60/60/24 > 3) {
      MailController.rProviderPay(unpaidContest[i].dataValues)
    }
  }

  return
  // console.log('test')
}

async function rContestDel() {
  const today = new Date()
  const unpaidContest = await contest.findAll({
    where:{
      id_status_contest:3
    }
  })

  if (unpaidContest.length == 0) {
    return
  }

  for(let i=0;i<unpaidContest.length;i++) {
    if ((today - unpaidContest[i].dataValues.createdAt)/1000/60/60/24 > 7) {
      MailController.rContestDel(unpaidContest[i].dataValues)
      await contest.destroy({
        where:{
          id:unpaidContest[i].dataValues.id
        }
      })
    }
  }

  return
}

module.exports.rProviderPay = rProviderPay
module.exports.rContestDel = rContestDel

