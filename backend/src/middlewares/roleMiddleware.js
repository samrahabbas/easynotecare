
const protectRole = (...roles) => {
    (req, res, next) => {
        if (!roles.includes("sudoAdmin" || "superAdmin")) {
            return res.sendStatus(403);
        }

        next();
    }
};

const protectAddRole = () => {

}
module.exports = { protectRole };