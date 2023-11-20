const express=require('express');
const passport=require('passport')
const router=express.Router();
const userController=require('../controller/user_controller');
router.get('/',passport.checkAuthentication,userController.home);
router.use('/users',require('./user'))
module.exports=router;