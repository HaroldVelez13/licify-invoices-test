const config = require("../config/auth.config");
const db = require("../models");
const AuthSchemas = require("../validators/auth-schema");
const User = db.user;
const Role = db.role;
const registerUserSchema = AuthSchemas.registerUserSchema;
const loginUserSchema = AuthSchemas.loginUserSchema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  /*  
    #swagger.tags = ['Auth']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const { body } = req;
  try {
    const data = registerUserSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const user = new User({
      username: data.username,
      email: data.email,
      password: bcrypt.hashSync(data.password, 8),
    });

    user.save((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (req.body.roles) {
        Role.find(
          {
            name: { $in: req.body.roles },
          },
          (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }

              res.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err, _user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            const token = jwt.sign({ id: _user.id }, config.secret, {
              expiresIn: 86400, // 24 hours
            });
            req.session.token = token;
            res.status(200).send({
              id: _user._id,
              username: _user.username,
              email: _user.email,
              roles: _user.roles,
            });
          });
        });
      }
    });
  } catch (error) {
    return res.status(422).json({ errors: error.errors });
  }
};

exports.signin = (req, res) => {
  /*  
    #swagger.tags = ['Auth']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  const { body } = req;
  try {
    const data = loginUserSchema.validateSync(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    User.findOne({
      username: data.username,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = bcrypt.compareSync(
          data.password,
          user.password
        );

        if (!passwordIsValid) {
          return res.status(401).send({ message: "Invalid Password!" });
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });
        req.session.token = token;
        res.status(200).send({
          id: user._doc._id,
          username: user._doc.username,
          email: user._doc.email,
        });
      });
  } catch (error) {
    return res.status(422).json({ errors: error.errors });
  }
};

exports.signout = async (req, res) => {
  /*  
    #swagger.tags = ['Auth']
    #swagger.autoBody=true  
    #swagger.autoQuery=true  
    #swagger.autoHeaders=true  
  */
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
