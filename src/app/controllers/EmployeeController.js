const Admin = require('../models/Admin');
const User = require('../models/User');
const moment = require('moment-timezone');
const mongoose = require('mongoose');

moment.tz.setDefault('Asia/Ho_Chi_Minh').locale('id');

class EmployeeController {
    // [GET] /admin/:id
    get_lists(req, res, next) {
        User.findOne({ _id: req.params.id })
            .then((data) => {
                const admin = req.session.admin;

                const currentDate = moment();

                let arr = data.todo;

                arr.forEach((x) => {
                    let deadline = moment(x.dueDate);

                    // Calculate the difference in milliseconds
                    const diff = deadline.diff(currentDate, 'milliseconds');

                    // Convert milliseconds to days and hours
                    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hoursLeft = Math.floor(
                        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
                    );

                    // Store the calculated values
                    x.timeData = {};
                    if (diff > 0) {
                        x.timeData.daysLeft = hoursLeft;
                        x.timeData.hoursLeft = daysLeft;
                        x.timeData.hoursOnly = deadline.diff(
                            currentDate,
                            'hours',
                        );
                    } else {
                        x.timeData.daysLeft = 0;
                        x.timeData.hoursLeft = 0;
                        x.timeData.hoursOnly = 0;
                    }
                });

                res.render('admin_site/employee_todo', {
                    admin: admin,
                    todos: data.todo,
                });
            })
            .catch((err) => {
                next(err);
            });
    }
}

module.exports = new EmployeeController();
