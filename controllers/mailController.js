const {
  user,
  status,
  role,
  payment,
  contest,
  application
} = require('../models');
const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, 
  auth: {
    user: 'ignatius34@ethereal.email',
    pass: 	'rAARGjX2njWThQFnWs', 
  },
});

class MailController {
  async create(user1,req,res) {
    const user3 = await user.findOne({
      where:{
        id:user1.id
      }
    })

    const htmlMail = `<h2 align="center">Congratulation You have Created a Contest!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${req.body.title}</li>
      <li>Prize: ${req.body.prize}</li>
      <li>Due Date: ${req.body.due_date}</li>
      <li>Announcement: ${req.body.announcement}</li>
      <li>Description: ${req.body.description}</li>
    </ul>
    <h3>Your Next Step :</h3>
    <p>Please proceed to the payment submission page to open your contest.\n</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msg = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Contest Created", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail //html body
    }

    transporter.sendMail(msg, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async provider(user1,req,res) {
    const user3 = await user.findOne({
      where:{
        id:user1.id
      }
    })

    const htmlMail1 = `<h2 align="center">Your Payment has been Submitted!</h2>

    <p>Kindly wait for admin to approve your payment to open your contest.\n</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msgProvider = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Payment Submitted", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail1 //html body
    }

    transporter.sendMail(msgProvider, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });

    const htmlMail2 = `<h2 align="center">Payment has been Submitted!</h2>

    <p>Provider with userID ${user3.id} has submitted the payment evidence for contest with contestID ${req.params.id_contest}.</p>
    <p>Please proceed to contest detail - Payment Confirmation page to approve or reject the submission.</p>
    
    `

    const msgAdmin = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `admin@example.com`, // list of receivers
      subject: "Payment Submitted", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail2 //html body
    }

    transporter.sendMail(msgAdmin, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async approve(user1,req,res) {
    const contest2 = await contest.findOne({
      where:{
        id:req.params.id_contest
      }
    })

    const user3 = await user.findOne({
      where:{
        id:contest2.id_provider
      }
    })

    const htmlMail1 = `<h2 align="center">Congratulation Your Payment Has Been Approved!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest2.title}</li>
      <li>Prize: ${contest2.prize}</li>
      <li>Due Date: ${contest2.due_date}</li>
      <li>Announcement: ${contest2.announcement}</li>
      <li>Description: ${contest2.description}</li>
    </ul>
    
    <p>We wish you good luck for your participation.\n</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msgProvider = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Payment Approved", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail1 //html body
    }

    transporter.sendMail(msgProvider, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async reject(user1,req,res) {
    const contest2 = await contest.findOne({
      where:{
        id:req.params.id_contest
      }
    })

    const user3 = await user.findOne({
      where:{
        id:contest2.id_provider
      }
    })

    const htmlMail1 = `<h2 align="center">Sorry Your Payment Has Been Rejected!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest2.title}</li>
      <li>Prize: ${contest2.prize}</li>
      <li>Due Date: ${contest2.due_date}</li>
      <li>Announcement: ${contest2.announcement}</li>
      <li>Description: ${contest2.description}</li>
    </ul>
    
    <p>Kindly submit the payment evidence for your contest to be opened.\n</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msgProvider = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Payment Approved", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail1 //html body
    }

    transporter.sendMail(msgProvider, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async submit(user1,req,res) {
    const user3 = await user.findOne({
      where:{
        id:user1.id
      }
    })

    const contest2 = await contest.findOne({
      where:{
        id:req.params.id_contest
      }
    })

    const htmlMail = `<h2 align="center">Congratulation You have Submitted Your Work!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest2.title}</li>
      <li>Prize: ${contest2.prize}</li>
      <li>Due Date: ${contest2.due_date}</li>
      <li>Announcement: ${contest2.announcement}</li>
      <li>Description: ${contest2.description}</li>
    </ul>
    
    <h3>Submission Detail :</h3>
    <ul>
      <li>You have submitted ${req.files.length} files.</li>
      <li>Description: ${req.body.description}.</li>
    </ul>
    
    <p>We wish you good luck for your participation.\n</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msg = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Contest Created", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail //html body
    }

    transporter.sendMail(msg, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async winner(user1,req,res) {
    const submission1 = await application.findOne({
      where:{
        id:req.params.id_submission
      }
    })

    const user3 = await user.findOne({
      where:{
        id:submission1.id_participant
      }
    })

    const contest2 = await contest.findOne({
      where:{
        id:submission1.id_contest
      }
    })

    const htmlMail1 = `<h2 align="center">Congratulation You Won!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest2.title}</li>
      <li>Prize: ${contest2.prize}</li>
    </ul>
    <p>The prize will be bank-in to your account within 7 days.\nRemember to update your account detail in your profile.\n</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msgProvider = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Winning Contest", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail1 //html body
    }

    transporter.sendMail(msgProvider, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });

    const htmlMail2 = `<h2 align="center">Proceed to Payment! </h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest2.title}</li>
      <li>Prize: ${contest2.prize}</li>
    </ul>
    <h3>Winner Detail :</h3>
    <ul>
      <li>Winner: ${user3.fullname}</li>
      <li>Bank: ${user3.bank} ${user3.account_number}</li>
      <li>Amount: ${contest2.prize}</li>
    </ul>
    <p>Please make the payment to the winner within 7 days.</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    
    `

    const msgAdmin = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `admin@example.com`, // list of receivers
      subject: "Submit Payment to Winner", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail2 //html body
    }

    transporter.sendMail(msgAdmin, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async admin(user1,req,res) {
    const user3 = await user.findOne({
      where:{
        id:req.params.id_winner
      }
    })

    const contest2 = await contest.findOne({
      where:{
        id:req.params.id_contest
      }
    })

    const htmlMail = `<h2 align="center">Congratulation You Won!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest2.title}</li>
      <li>Prize: ${contest2.prize}</li>
    </ul>
    <p>The prize has been sent to your account.\nThank you for your participation.</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msg = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Payment Submitted", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail //html body
    }

    transporter.sendMail(msg, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async rProviderPay(contest) {
    const user3 = await user.findOne({
      where:{
        id:contest.id_provider
      }
    })
    
    const due_date = contest.createdAt

    const htmlMail = `<h2 align="center">Reminder!</h2>
    <h2 align="center">Please Proceed to Your Payment!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest.title}</li>
      <li>Prize: ${contest.prize}</li>
      <li>Due Date: ${new Date(due_date.setDate(due_date.getDate()+7))}</li>
    </ul>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msg = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Payment Reminder", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail //html body
    }

    transporter.sendMail(msg, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

  async rContestDel(contest) {
    const user3 = await user.findOne({
      where:{
        id:contest.id_provider
      }
    })
    
    const due_date = contest.createdAt


    const htmlMail = `<h2 align="center">Unpaid Contest Deleted!</h2>
    <h3>Contest Detail :</h3>
    <ul>
      <li>Title: ${contest.title}</li>
      <li>Prize: ${contest.prize}</li>
      <li>Due Date: ${new Date(due_date.setDate(due_date.getDate()+7))}</li>
    </ul>
    <p>We are sorry to inform you that the contest created will be deleted due to no payment submitted before the payment due date.</p>
    <p>Regards,</p>
    <p>RealizDea</p>
    `

    const msg = {
      from: '"Realizdea" <Realizdea@example.com>', // sender address
      to: `${user3.email}`, // list of receivers
      subject: "Contest Deleted", // Subject line
      // text: `${text}`, // plain text body
      html: htmlMail //html body
    }

    transporter.sendMail(msg, (error,info) => {
      if (error) {
        return console.log(error);
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));   
    });
  }

}

module.exports = new MailController;