const {logEvent} = require('./logEvent')

const errorHandler=(err, req, res, next) => {
    logEvent(`${err.name}\t${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errorLog.txt')
    // console.log(err.stack)
    res.status(500).send(err.message)
    next()
}

module.exports = {errorHandler}