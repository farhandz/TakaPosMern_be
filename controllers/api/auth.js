const response = require('../../helper/response')

module.exports = {
    getAlldata: (req,res) => {
        try {
            response.success(res, 200,  "ini dari getall data", [])
        } catch (error) {
            response.success(res, 500, "ini dari getall error", [])
        }
    }
}