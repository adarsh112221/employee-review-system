const User = require('../model/user')
const Review = require('../model/review')

module.exports.home = (req, res) => {
    res.send("Controller")
}

module.exports.login = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    console.log(req.isAuthenticated())
    console.log('user is not authenticated')
    return res.render('login', {
        title: "Login || ERS"
    });
}
module.exports.register = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('register', {
        title: "SignUp || ERS"
    });
}


//controller for creating user controller
module.exports.createUser=async (req,res)=>{

try{
    if(req.body.password!=req.body.password2){
        console.log('password did not matched')
        return res.redirect('/users/register')
    }
    let user=await User.findOne({email:req.body.email})
    if(user){
        console.log('user already exists')
        return res.redirect('/users/register');
    }else{
        await User.create({name:req.body.name,email:req.body.email,isAdmin:false,password:req.body.password})
        console.log('User created successfully');
        return res.redirect('/users/login');
    }
}catch(err){
console.log('error in creating the user',err);
return res.redirect('register');
}

}
module.exports.createSession=function(req,res){
    console.log('here logged into the system')
    return res.redirect('/')
}