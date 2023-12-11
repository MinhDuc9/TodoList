const Admin = require('../models/Admin');
const User = require('../models/User');
const moment = require('moment-timezone');
const mongoose = require('mongoose');

const { GetUserInfo } = require('../Functions/GetInfo');

moment.tz.setDefault('Asia/Ho_Chi_Minh').locale('id');

class EmployeeController {
    // [GET] /admin/:id
    get_lists(req, res, next) {
        GetUserInfo(req.params.id, req, res, next);
    }
}

module.exports = new EmployeeController();
