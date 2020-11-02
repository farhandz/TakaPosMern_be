const response = require("../../helper/response");
const categoryModel = require('../../model/Category');
const { findByIdAndUpdate } = require("../../model/Category");
module.exports = {
  getAlldata: (req, res) => {
    try {
      response.success(res, 200, "ini dari getall data", []);
    } catch (error) {
      response.success(res, 500, "ini dari getall error", []);
    }
},
insertCategory: async (req, res) => {
    try {
        const {name} = req.body
        const data = await categoryModel.create({name})
        response.success(res, 200, "sucess inser data", data)
    } catch (error) {
            response.success(res, 500, "error add", error.message);
        }
    },
    getByidCategory: async (req, res) => {
        try {
            const {id} = req.params
            const data = await categoryModel.findById({_id: id})
            response.success(res, 200, "getby id sucsess", data)
        } catch (error) {
        response.success(res, 500, "error add", error.message);
    }
  },
  updateCategory: async (req, res) => {
      try {
            const {name} = req.body
            const {id} = req.params
            const data = await categoryModel.findOneAndUpdate({_id: id}, {name: name})
            response.success(res, 200, "update success", data)
        } catch (error) {
            response.success(res, 500, "error add", error.message);
        }
    },
    deleteCategory: async(req, res) => {
        try {
            const {id} = req.params
            const data = await categoryModel.deleteOne({_id: id})
            response.success(res, 200, "delete success", data)
        } catch (error) {
            response.success(res, 200, "error delete category", data)
      }
  }
};
