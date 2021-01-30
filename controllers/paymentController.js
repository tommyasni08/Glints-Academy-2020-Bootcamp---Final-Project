const {
    user,
    status,
    role,
    payment,
    contest,
    application
} = require('../models');

const numFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits:0
})

const moment = require('moment')

const Op = require('sequelize').Op;

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

class PaymentController {
    constructor() {
        user.hasMany(payment, {
            foreignKey: 'id_provider'
        })
        payment.belongsTo(user, {
            foreignKey: 'id_provider'
        })
        contest.hasMany(payment, {
            foreignKey: 'id_contest'
        })
        payment.belongsTo(contest, {
            foreignKey: 'id_contest'
        })
        // contest.hasMany(payment, {
        //     foreignKey: "id_contest"
        // })
        // payment.belongsTo(contest, {
        //     foreignKey: 'id_contest'
        // })
        status.hasMany(payment, {
            foreignKey: 'id_status_contest'
        })
        payment.belongsTo(status, {
            foreignKey: 'id_status_contest'
        })
        // status.hasMany(payment, {
        //     foreignKey: 'status_winner_payment'
        // })
        // payment.belongsTo(status, {
        //     foreignKey: 'status_winner_payment'
        // })

    }

    async provider(user1, req, res) {
        const contest1 = await contest.findOne({
            where: {
                id: req.params.id_contest
            }
        })
        
        const due_date = contest1.createdAt
        due_date.setDate(due_date.getDate()+7)


        let paidContest = await payment.create({
            id_contest:req.params.id_contest,
            id_provider:req.params.id_provider,
            id_status_contest:6,
            bank_provider: req.body.bank_provider,
            account_number_provider: req.body.account_number_provider,
            due_date_provider: due_date,
            payment_date_provider: new Date(),
            evidence_provider: req.file.filename,
            status_provider_payment:"Unpaid",
            status_winner_payment:"Unpaid",
        }
)

        const result = await payment.findOne({
            where: {
                id:paidContest.id
            },
            attributes: [
                'id',
                'bank_provider',
                'account_number_provider',
                'evidence_provider'
            ],
            include:[{
                model:user,
                attributes:[
                    ['fullname', 'provider']
                ]
            }, {
                model:status,
                attributes:[
                    ['status', 'contest_status']
                ]
            }, {
                model:contest,
                attributes:[
                    'title',['prize', 'amount']
                ]
            }]
        })

        return res.status(200).json({
            message: "Success",
            result: result
          })
    }

    async payment(user1,req,res) {
        const result = await payment.findOne({
            where:{
                id_contest:req.params.id_contest
            },
            attributes:[
                'id',
                'bank_provider',
                'account_number_provider',
                'evidence_provider'
            ],
            include:[{
                model:contest,
                attributes:[['prize','amount']]
            }]
        })

        result.contest.dataValues.amount = numFormatter.format(result.contest.dataValues.amount)

        return res.status(200).json({
            message:"Success",
            result:result
        })
    }

    async approve(user1,req,res) {
        await contest.update({
            id_status_contest:1
        },{
            where:{
                id:req.params.id_contest
            }
        })

        const contest1 = await contest.findOne({
            where:{
                id:req.params.id_contest
            }
        })

        const payment_date = new Date(contest1.dataValues.announcement)
        payment_date.setDate(payment_date.getDate()+7)

        let update = {
            status_provider_payment:"Paid",
            payment_date_provider: new Date(),
            id_status_contest:contest1.id_status_contest,
            due_date_winner: payment_date
        }

        await payment.update(update,{
            where:{
                id_contest:req.params.id_contest
            }
        })

        const result = await payment.findOne({
            where:{
                id_contest:req.params.id_contest
            },
            attributes:[
                'id',
                'bank_provider',
                'account_number_provider',
                'payment_date_provider',
                'evidence_provider',
                'status_provider_payment',
                'due_date_winner',
                'status_winner_payment'
            ],
            include:[{
                model:contest,
                attributes:[['prize','amount'],'title']
            },{
                model:user,
                attributes:[['fullname','provider']]
            }, {
                model:status,
                attributes:['status']
            }]
        })

        return res.status(200).json({
            message:"Success",
            result:result
        })
    }

    async reject(user1,req,res) {
        await payment.destroy({
            where:{
                id_contest:req.params.id_contest
            }
        })

        return res.status(200).json({
            message:"Success",
        })
    }

    async admin(user1,req,res) {
        let update ={
            payment_date_winner:new Date(),
            evidence_winner:req.file.filename,
            status_winner_payment:"Paid"
        }

        await payment.update(update,{
            where:{
                id_contest:req.params.id_contest
            }
        })

        const result = await payment.findOne({
            where:{
                id_contest:req.params.id_contest
            },
            attributes:[
                'id',
                'winner',
                'bank_winner',
                'account_number_winner',
                'evidence_winner',
                'status_winner_payment',
                'payment_date_winner'
            ],
            include:[{
                model:contest,
                attributes:[
                    'title',
                    ['prize','amount']
                ]
            }, {
                model:user,
                attributes:[
                    ['fullname','provider']
                ]
            }, {
                model:status,
                attributes:['status']
            }]
        })

        return res.status(200).json({
            message:"Success",
            result:result
        })
    }
}

module.exports = new PaymentController;