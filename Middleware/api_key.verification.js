const dotenv = require('dotenv')

module.exports = async (req, res, next) => {
    const checkApiKey = req.headers.secret_token

    if(checkApiKey != process.env.SECRET_TOKEN) {
        return res.send('Access denied')
    } else {
        next()
    }
}