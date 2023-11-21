const express=require('express');
const router=express.Router();
const passport=require('passport');
const adminController=require('../controller/admin_controller');
router.get('/admin-page',passport.checkAuthentication,adminController.adminPage);
router.post('/set-reviewers',passport.checkAuthentication,adminController.setReviewers)
router.post('/new-admin',passport.checkAuthentication,adminController.newAdmin
)
router.get('/view-employees',passport.checkAuthentication,adminController.viewEmployees
)
router.get('.delete-employee/:id',passport.checkAuthentication.deleteEmployee)

