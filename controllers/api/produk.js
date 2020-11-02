const produkModel = require('../../model/Produk')
const response = require('../../helper/response')
const Category = require('../../model/Category')
const upload = require('../../helper/upload')
const { mongo } = require('mongoose')
const multer = require('multer')
const fs  = require('fs-extra')
const path = require('path')
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
    },
    deleteProduk: async (req, res) => {
        try {
            const {id} = req.params
           const data = await produkModel.findByIdAndDelete({_id: id})
           response.success(res, 200, "succeess delete produk", data)
        } catch (error) {
            response.failed(res, 500, "error delete produk", error.message )
        }
    },
    updateProduk: (req, res) => {
      try {
        upload.uploadsingle(req, res, async (err) => {
         try {
            if (err) {
              res.send({
                message: err,
              });
            } else {
              const { id } = req.params;
              const prevdata = await produkModel.findById({_id: id})
              const image = !req.file ? prevdata.image : req.file.filename
              const title = req.body.title.length === 0 || !req.body ? prevdata.title : req.body.title
              const harga = req.body.harga.length === 0 || !req.body ? prevdata.harga : req.body.harga
              const id_category = req.body.id_category.length   === 0 || !req.body ? prevdata.id_category : req.body.id_category
              if(image === prevdata.image) {
                const data = await produkModel.findByIdAndUpdate({_id: id}, {title: title, harga: harga, id_category: id_category, image: image})
                response.success(res, 200, "berhasil update", data) 
              } else {
                await fs.unlink(path.join(`public/images/${prevdata.image}`));
                const data = await produkModel.findByIdAndUpdate({_id: id}, {title: title, harga: harga, id_category: id_category, image: image})
                response.success(res, 200, "berhasil update", data) 
              }
            }
         } catch (error) {
            response.failed(res, 500, "error", error.message)
         }
        })
      } catch (error) {
        response.failed(res, 500, "error update data", error.message)
      }
    }
}