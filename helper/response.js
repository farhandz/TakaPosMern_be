module.exports = {
    success: (res, status, message, data) => {
        res.json({
            message: message,
            status: status,
            data: data
        })
    },
    failed: (res, status, message, error) => {
        res.json({
            message: message,
            status: status,
            error: error
        })
    }
}