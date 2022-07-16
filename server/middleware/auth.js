const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

if (!SECRET_KEY) throw new Error('SECRET_KEY must be set in .env')

module.exports = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        const token = header.split(' ')[1];
        const decodedToken = jwt.verify(token, SECRET_KEY);
        req.reqdata = decodedToken;
        if (req.body.user_id && req.body.user_id !== req.reqdata.user_id) {
            throw ' Invalid user ID';
        } else {

            next();
        }
    }
    catch (error) {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}