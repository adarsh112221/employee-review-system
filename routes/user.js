const express=require('express');
const passport=require('passport')
const router=express.Router();
const userController=require('../controller/user_controller');
router.use('/login',userController.login);
router.get('/register',userController.register);
router.post('/create-user',userController.createUser);
router.post('/create-session',
    passport.authenticate(
        'local',
        { failureRedirect: '/users/login' }
    ) , userController.createSession);
module.exports=router;