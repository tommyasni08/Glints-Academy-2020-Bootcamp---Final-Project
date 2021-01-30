const {
    user,
    status,
    role,
    payment,
    contest,
    application
  } = require('../models');

const Op = require('sequelize').Op;
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = require('../routes/contestRoutes');
const numFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits:0
})

class AdminController{
    constructor(){
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
        status.hasMany(payment, {
            foreignKey: 'id_status_contest'
        })
        payment.belongsTo(status, {
            foreignKey: 'id_status_contest'
        })
    }

    async dashboard(user1, req, res){
    
        const page = parseInt(req.query.page); // Pagination constant
        const limit = 5;
        const offset = (page - 1) * limit;

        const totalResult = await payment.findAndCountAll({})

        const result = await payment.findAll({
            attributes:[
                'id_contest',
                'status_provider_payment',
                'payment_date_provider',
                'due_date_provider',
                'evidence_provider',
                'status_winner_payment',
                'payment_date_winner',
                'due_date_winner',
                'evidence_winner'
            ],
            include:[{
                model: user,
                attributes:[['fullname', 'provider']]
            },{
                model:contest,
                attributes: [
                    'title',
                    ['prize','amount']
                ]
            },{
                model:status,
                attributes: ['status']
            }],
            offset:offset,
            limit:limit
        })


        const totalPage = (totalResult.count < limit) ? 1 : Math.ceil(totalResult.count / limit)


        result.map(x => x.contest.dataValues.amount = numFormatter.format(x.contest.dataValues.amount))


        return res.status(200).json({
            message: "Success",
            totalResult:totalResult.count,
            totalPage,      
            result: result
        })

    }

    async paid(user1, req, res){
    
        const page = parseInt(req.query.page); // Pagination constant
        const limit = 5;
        const offset = (page - 1) * limit;

        const totalResult = await payment.findAndCountAll({
            where:{
                status_provider_payment:'Paid',
                status_winner_payment:'Paid',
            }
        })

        const result = await payment.findAll({
            where:{
                status_provider_payment:'Paid',
                status_winner_payment:'Paid',
            },
            attributes:[
                'id_contest',
                'status_provider_payment',
                'payment_date_provider',
                'due_date_provider',
                'evidence_provider',
                'status_winner_payment',
                'payment_date_winner',
                'due_date_winner',
                'evidence_winner'
            ],
            include:[{
                model: user,
                attributes:[['fullname', 'provider']]
            },{
                model:contest,
                attributes: [
                    'title',
                    ['prize','amount']
                ]
            },{
                model:status,
                attributes: ['status']
            }],
            offset:offset,
            limit:limit
        })


        const totalPage = (totalResult.count < limit) ? 1 : Math.ceil(totalResult.count / limit)

        result.map(x => x.contest.dataValues.amount = numFormatter.format(x.contest.dataValues.amount))

        return res.status(200).json({
            message: "Success",
            totalResult:totalResult.count,
            totalPage,      
            result: result
        })

    }

    async unpaid(user1, req, res){
    
        const page = parseInt(req.query.page); // Pagination constant
        const limit = 5;
        const offset = (page - 1) * limit;

        const totalResult = await payment.findAndCountAll({
            where:{
                [Op.or]:[
                    {status_provider_payment:'Unpaid'},
                    {status_winner_payment:'Unpaid'}
                ]
            }
        })

        const result = await payment.findAll({
            where:{
                [Op.or]:[
                    {status_provider_payment:'Unpaid'},
                    {status_winner_payment:'Unpaid'}
                ]
            },
            attributes:[
                'id_contest',
                'status_provider_payment',
                'payment_date_provider',
                'due_date_provider',
                'evidence_provider',
                'status_winner_payment',
                'payment_date_winner',
                'due_date_winner',
                'evidence_winner'
            ],
            include:[{
                model: user,
                attributes:[['fullname', 'provider']]
            },{
                model:contest,
                attributes: [
                    'title',
                    ['prize','amount']
                ]
            },{
                model:status,
                attributes: ['status']
            }],
            offset:offset,
            limit:limit
        })

        const totalPage = (totalResult.count < limit) ? 1 : Math.ceil(totalResult.count / limit)

        result.map(x => x.contest.dataValues.amount = numFormatter.format(x.contest.dataValues.amount))

        return res.status(200).json({
            message: "Success",
            totalResult:totalResult.count,
            totalPage,      
            result: result
        })

    }

    async contestWinner(user1,req,res) {
        const result = await payment.findOne({
            where:{
                id_contest:req.params.id_contest
            },
            attributes:[
                'status_winner_payment'
            ]
        })

        return res.status(200).json({
            message: "Success",     
            result: result
        })


    }
}


module.exports = new AdminController;
