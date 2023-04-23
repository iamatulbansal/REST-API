const verify = require("./verifyToken");
const controller = require("../controllers/controller");
const PATH = require('../constants/url')
module.exports = (app) => {
    app.post(PATH.REGISTER, controller.register);
    app.post(PATH.LOGIN, controller.login);
    app.get(PATH.ALL_USERS, verify, controller.users);
    app.get(PATH.PROFILE, verify, controller.profile);
};
