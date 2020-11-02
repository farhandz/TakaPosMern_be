const mongoose = require('mongoose')
const aggregatePaginate = require("mongoose-paginate-v2"); 
const { ObjectId } = mongoose.Schema;

const produkScema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    harga: {
      type: Number,
      required: true,
    },
    id_category: {
      type: ObjectId,
      ref: "Category",
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    collection: "produks",
  }
);

produkScema.index({title: '/text/'})
produkScema.plugin(aggregatePaginate);
module.exports = mongoose.model("Produk", produkScema)
