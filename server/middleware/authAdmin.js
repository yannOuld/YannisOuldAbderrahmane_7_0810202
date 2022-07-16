
module.exports = async (req, res, next) => {

    try {

        decodedToken = req.reqdata;

        if (decodedToken.role !== 'admin') throw new Error('you are not an admin !')

        next()

    } catch {
        return res.status(403).json('Unauthorized')
    }
}