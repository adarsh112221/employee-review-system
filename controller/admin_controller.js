const User=require('../model/user')
const Review=require('../model/review')

module.exports.adminPage = async function (req, res) {
    if (!req.isAuthenticated()) {
        return res.redirect('/users/login');
    } else {
        if (req.user.isAdmin == false) {
            console.log("You are not an admin");
            return res.redirect('/');
        } else {
            try {
                let user = await User.find({});
                var employeeList = [];
                for (let i = 0; i < user.length; i++) {
                    var temp = {
                        name: user[i].name,
                        id: user[i].id,
                    };
                    employeeList.push(temp);
                }

                return res.render('admin', {
                    title: "ERS | Admin page",
                    employeeList: employeeList,
                });
            } catch (err) {
                console.log('Error while admin', err);
                return;
            }
        }
    }
};


module.exports.setReviewrs = (req, res) => {
    // i will be back....... 
    console.log('continued.........');
    res.send('yeah good')
}


// make new admin admin to an employee
module.exports.newAdmin = async function (req, res) {
    try {
        if (!req.isAuthenticated()) {
            return res.redirect('/users/login');
        }
        if (req.user.isAdmin == true) {
            let employee = await User.findById(req.body.newAdmin);

            if (!employee) {
                return res.redirect('back');
            }

            if (employee.isAdmin == true) {
                return res.redirect('back');
            }

            if (employee.isAdmin == false) {
                employee.isAdmin = true,
                    employee.save();

                return res.redirect('/admin/admin-page');
            }
        }
    } catch (err) {
        console.log("Error", err);
        return;
    };

};


// views employees
module.exports.viewEmployees = async function (req, res) {
    try {
        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                let employees = await User.find({});

                if (employees) {
                    return res.render('employee', {
                        title: "Employee || ERS",
                        employees: employees,
                    });
                }
            } else {
                console.log("user is not authorized check list of Employees");
                return res.redirect('/');
            }
        } else {
            console.log("user not authenticated");
            return res.redirect("/users/login");
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }
};






//deleting employees
module.exports.deleteEmployee = async function (req, res) {
    try {

        if (req.isAuthenticated()) {
            if (req.user.isAdmin) {
                await User.deleteOne({ _id: req.params.id });
                return res.redirect('/admin/view-employees');
            }
        }
    } catch (err) {
        console.log("Error", err);
        return;
    }

};

