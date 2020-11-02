const produkModel = require('../../model/Produk')
const response = require('../../helper/response')
const Category = require('../../model/Category')
const upload = require('../../helper/upload')
const { mongo } = require('mongoose')
module.exports = {
    insertProduk: async(req, res ) => {
        try {
            upload.uploadsingle(req, res, async (err) => {
             try {
                  if (err) {
                    res.send({
                      message: err,
                    });
                  } else {
                    const image = req.file.filename
                    const { id_category, title, harga } = req.body;
                    const data = await produkModel.create({
                      title,
                      harga,
                      id_category,
                      image
                    });
                    response.success(res, 500, "berhasil insert dproduk", data);
                  }
             } catch (error) {
                 res.send({
                     message: error.message
                 })
             }
            });
        } catch (error) {
            res.send({
                message: error.message
            })
        }
    },
    viewProduk: async (req, res) => {
        try {
             const name = req.query.name
             const page = !req.query.page ? 1 : parseInt(req.query.page)
              const data = await produkModel.find()
             const limit = !req.query.limit ? data.length : parseInt(req.query.limit)
             const TotalPage = Math.ceil(data.length / limit)
             if(!name) {
                 const data = await produkModel.find().limit(limit).skip((page - 1) * limit)
                  .populate({ path: "id_category", select: "name"})
                  res.send({
                      message: "pagination all",
                      meta: {
                          TotalPage: TotalPage,
                          page: page
                        },
                      data: data
                  })
             } else {
                  const data = await produkModel
                    .find({
                      $text: {
                        $search: name,
                      },
                    })
                    .limit(limit)
                    .skip((page - 1) * limit)
                    .populate({ path: "id_category", select: "name" });
                    res.send({
                      message: "pagination all",
                      meta: {
                        TotalPage: TotalPage,
                        page: page,
                      },
                      data: data,
                    });
             }
           
        } catch (error) {
            response.failed(res, 500, "error get all produk produk", error.message);
        }
    }
}