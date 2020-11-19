var express = require('express');
var router = express.Router();

express.application.prefix = express.Router.prefix = function (path, configure) {
  var router = express.Router();
  this.use(path, router);
  configure(router);
  return router;
};

const userController = require('../controllers').user;
const roleController = require('../controllers').role;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.prefix('/api/v1', function(router) {
  router.get('/user', userController.list);
  router.get('/user/:id', userController.getById);
  router.post('/user',  userController.add);
  router.put('/user/:id', userController.update);
  router.delete('/user/:id', userController.delete);

  router.get('/role', roleController.list);
  router.get('/role/:id', roleController.getById);
  router.post('/role',  roleController.add);
  router.put('/role/:id', roleController.update);
  router.delete('/role/:id', roleController.delete);
})

module.exports = router;
