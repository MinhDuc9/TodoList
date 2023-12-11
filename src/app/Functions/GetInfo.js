const User = require('../models/User');
const moment = require('moment-timezone');

moment.tz.setDefault('Asia/Ho_Chi_Minh').locale('id');

module.exports = {
    GetUserInfo: function (valueId, req, res, next) {
        const admin = req.session.admin;
        const user = req.session.user;

        User.findById(valueId)
            .then((data) => {
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

                if (admin !== undefined) {
                    res.render('admin_site/employee_todo', {
                        admin: admin,
                        todos: data.todo,
                    });
                } else {
                    res.render('todo/index', {
                        user: user,
                        todos: data.todo,
                    });
                }
            })
            .catch((err) => {
                next(err);
            });
    },
};
