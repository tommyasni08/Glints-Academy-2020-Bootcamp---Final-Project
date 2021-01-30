const bcrypt = require('bcrypt');
const passport = require('passport');
const localStrategy = require('passport-local');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const {user,status,role,payment,contest,application} = require('../../models');

passport.use(
  'register',
  new localStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, email, password, done) => {
      function checkFullName() {
        const store = req.body.fullname;
        (store.includes(" ")) ? fullname = store : fullname = `${store} ${store}`
      }
      checkFullName()

      const splitname = fullname.split(" ")
      const firstname = splitname[0]

      function lastname() {
        (splitname.length > 2) ? lastname = splitname.slice(1).join(" ") : lastname = splitname[1]
      }
      lastname();

      let createdUser = await user.create({
        fullname: fullname,
        firstname: firstname,
        lastname:lastname,
        email: email,
        password: password,
        id_role: req.body.role
      });

      let newUser = await user.findOne({
        where: {
          id: createdUser.id
        },
        attributes: ['id', 'fullname', 'id_role']
      });

      return done(null, newUser, {
        message: 'Register Success!'
      });
    },
  )
);

passport.use(
  'login',
  new localStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      const userLogin = await user.findOne({
        where: {
          email: email
        }
      });

      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!'
        })
      };
      const validate = await bcrypt.compare(password, userLogin.password);
      if (!validate) {
        return done(null, false, {
          message: 'Wrong password!'
        })
      };

      let userLoginVisible = await user.findOne({
        where: {
          email: email
        },
        attributes: ['id', 'fullname', 'id_role']
      });

      return done(null, userLoginVisible, {
        message: 'Login Success!'
      })
      // try {
      //   const userLogin = await user.findOne({
      //     where: {
      //       email: email
      //     }
      //   });
      //   if (!userLogin) {
      //     return done(null, false, {
      //       message: 'User not found!'
      //     })
      //   };
      //   const validate = await bcrypt.compare(password, userLogin.password);
      //   if (!validate) {
      //     return done(null, false, {
      //       message: 'Wrong password!'
      //     })
      //   };
      //
      //   let userLoginVisible = await user.findOne({
      //     where: {
      //       email: email
      //     },
      //     attributes: ['id', 'fullname', 'id_role']
      //   });
      //
      //
      //   return done(null, userLoginVisible, {
      //     message: 'Login Success!'
      //   });
      // } catch (e) {
      //   return done(null, false, {
      //     message: "Can't Login!"
      //   })
      // }
    }
  )
);

passport.use(
  'user',
  new JWTstrategy({
      secretOrKey: 'secret_password',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback:true
    },
    async (req, token, done) => {
      const userLogin = await user.findOne({
        where: {
          id: token.user.id
        },
        attributes: ['id', 'fullname', 'id_role']
      });

      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!'
        })
      };

      if (userLogin.id_role == 1) {
        return done(null, false, {
          message: "Unauthorized!"
        })
      };

      return done(null, userLogin, {
        message: "Authorized!"
      });
    }
  )
);

passport.use(
  'all',
  new JWTstrategy({
      secretOrKey: 'secret_password',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback:true
    },
    async (req, token, done) => {
      const userLogin = await user.findOne({
        where: {
          id: token.user.id
        },
        attributes: ['id', 'fullname', 'id_role']
      });

      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!'
        })
      };

      return done(null, userLogin, {
        message: "Authorized!"
      });
    }
  )
);

passport.use(
  'admin',
  new JWTstrategy({
      secretOrKey: 'secret_password',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback:true
    },
    async (req, token, done) => {
      const userLogin = await user.findOne({
        where: {
          id: token.user.id
        },
        attributes: ['id', 'fullname', 'id_role']
      });

      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!'
        })
      };

      if (userLogin.id_role !== 1) {
        return done(null, false, {
          message: "Unauthorized!"
        })
      };

      return done(null, userLogin, {
        message: "Authorized!"
      });
    }
  )
);

passport.use(
  'provider',
  new JWTstrategy({
      secretOrKey: 'secret_password',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback:true
    },
    async (req, token, done) => {
      const userLogin = await user.findOne({
        where: {
          id: token.user.id
        },
        attributes: ['id', 'fullname', 'id_role']
      });

      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!'
        })
      };

      if (userLogin.id_role !== 2) {
        return done(null, false, {
          message: "Unauthorized!"
        })
      };

      return done(null, userLogin, {
        message: "Authorized!"
      });
    }
  )
);

passport.use(
  'participant',
  new JWTstrategy({
      secretOrKey: 'secret_password',
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      passReqToCallback:true
    },
    async (req, token, done) => {
      const userLogin = await user.findOne({
        where: {
          id: token.user.id
        },
        attributes: ['id', 'fullname', 'id_role']
      });

      if (!userLogin) {
        return done(null, false, {
          message: 'User not found!'
        })
      };

      if (userLogin.id_role !== 3) {
        return done(null, false, {
          message: "Unauthorized!"
        })
      };

      return done(null, userLogin, {
        message: "Authorized!"
      });
    }
  )
);
