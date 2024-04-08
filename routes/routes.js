const express = require("express");
const routes = express();
const controller = require('../controllers/controller')


routes.get('/',controller.defaultRoute);
routes.post('/register',controller.register)
routes.get('/registerPage',controller.registerPage)
routes.post('/loginPage',controller.loginPage)


module.exports = routes;