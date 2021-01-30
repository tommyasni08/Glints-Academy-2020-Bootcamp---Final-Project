const {
  user,
  status,
  role,
  payment,
  contest,
  application
} = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken');

class UserController {
  constructor() {
    role.hasMany(user, {
      foreignKey: 'id_role'
    })
    user.belongsTo(role, {
      foreignKey: 'id_role'
    })
  }

  async register(user1, req, res) {
    // try {
    const body = {
      id: user1.id,
      fullname: user1.fullname,
      id_role: user1.id_role
    };

    const token = jwt.sign({
      user: body
    }, 'secret_password');

    return res.status(200).json({
      message: 'Register success!',
      token: token
    });
    // } catch (error) {
    //   return res.status(401).json({
    //     status: "Error!",
    //     message: error
    //   })
    // }
  }

  async login(user1, req, res) {
    // try {
    const body = {
      id: user1.id,
      fullname: user1.fullname,
      id_role: user1.id_role
    };

    const token = jwt.sign({
      user: body
    }, 'secret_password');

    return res.status(200).json({
      message: 'Login success!',
      token: token
    });
    // } catch (error) {
    //   return res.status(401).json({
    //     status: "Error!",
    //     message: error
    //   })
    // }
  }

  async profile(user1, req, res) {
    const result = await user.findOne({
      where: {
        id: user1.id
        // id:req.params.id
      },
      attributes: ['id','firstname', 'lastname', 'location', 'bank', 'account_number', "picture"]
    })

    return res.status(200).json({
      message: "Success",
      result: result
    })
  }

  async password(req,res) {
    try {
      user.update({
        password:req.body.password
      }, {
        where: {
          id: [1,2,3,4,5,6,7,8,9,10,11]
        }
      })
      return res.status(200).json({
        status:"Success"
      })
    } catch (e) {
      return res.status(401).json({
        status:"Error",
        message:e
      })
    }
  }

  async update(user1, req, res) {
    const oldInfo = await user.findOne({
      where: {
        id:user1.id
      }
    })

    let update = {
      firstname: req.body.firstname === "" ? oldInfo.firstname : req.body.firstname,
      lastname: req.body.lastname ===  "" ? oldInfo.lastname : req.body.lastname,
      location: req.body.location === "" ? oldInfo.location : req.body.location,
      bank: req.body.bank === "" ? oldInfo.bank : req.body.bank,
      account_number : req.body.account_number === "" ? oldInfo.account_number : req.body.account_number,
      picture: req.file === undefined ? oldInfo.picture.slice(5) : req.file.filename
    }

    await user.update(update, {
      where:{
        id:user1.id
      }
    })

    await user.update(update, {
      where:{
        id:user1.id
      }
    })

    const newInfo = await user.findOne({
      where: {
        id:user1.id
      }
    })

    user.update({
      fullname: `${newInfo.firstname} ${newInfo.lastname}`
    }, {
      where:{
        id:user1.id
      }
    }).then(result=> {
      return user.findOne({
        where:{
          id:user1.id
        },
        attributes: ['id',"firstname","lastname","location", "bank","account_number","picture"]
      })
    }).then(result=>{
      res.json({
        message:"Success",
        result:result
      })
    })
  }

}
module.exports = new UserController;
