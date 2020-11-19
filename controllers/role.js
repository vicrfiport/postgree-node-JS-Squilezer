const Role = require('../models').role;

module.exports = {
  list(req, res) {
    return Role
      .findAll({
        order: [
          ['createdAt', 'DESC'],
        ],
      })
      .then((roles) => res.status(200).send(roles))
      .catch((error) => { res.status(400).send(error); });
  },

  getById(req, res) {
    return Role
      .findByPk(req.params.id)
      .then((role) => {
        if (!Role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return res.status(200).send(role);
      })
      .catch((error) => res.status(400).send(error));
  },

  add(req, res) {
    return Role
      .create({
        name: req.body.name,
        code: req.body.code,
      })
      .then((role) => res.status(201).send(role))
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Role
      .findByPk(req.params.id)      
      .then(Role => {
        if (!Role) {
          return res.status(404).send({
            message: 'Role Not Found',
          });
        }
        return Role
          .update({
            name: req.body.name || Role.name,
            code: req.body.code || Role.code,
          })
          .then((role) => res.status(200).send(role))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Role
      .findByPk(req.params.id)
      .then(Role => {
        if (!Role) {
          return res.status(400).send({
            message: 'Role Not Found',
          });
        }
        return Role
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};